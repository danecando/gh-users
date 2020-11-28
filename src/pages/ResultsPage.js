import PropTypes from 'prop-types'
import { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@primer/components/lib/Box'
import Flex from '@primer/components/lib/Flex'
import Text from '@primer/components/lib/Text'
import ResultCount from '../components/ResultCount'
import SortSelect from '../components/SortSelect'
import UserList from '../components/UserList'
import Pagination from '../components/Pagination'
import sortOptions from '../lib/sortOptions.json'

function ResultsPage({ searchCache, userCache }) {
  const location = useLocation()
  const [totalCount, setTotalCount] = useState(undefined)
  const [results, setResults] = useState([])
  const [userList, setUserList] = useState(undefined)
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState(
    `${sortOptions[0].sort}_${sortOptions[0].order}`
  )
  const [error, setError] = useState(null)

  const params = new URLSearchParams(location.search)
  const query = params.get('q')

  const queryString = useMemo(() => {
    const [sort, order] = sortOrder.split('_')
    return `?q=${query}&sort=${sort}&order=${order}&page=${page}&per_page=10`
  }, [sortOrder, query, page])

  const setSearchResults = (data) => {
    setTotalCount(data.total_count)
    setResults(data.items)
    setUserList(undefined)
  }

  useEffect(() => {
    document.title = `Search - ${query}`

    searchCache.match(queryString).then((cachedResults) => {
      if (cachedResults) {
        console.info(`query: ${queryString} - cached results`)
        cachedResults.json().then(setSearchResults)
      } else {
        fetch(`https://api.github.com/search/users${queryString}`)
          .then((results) => results.json())
          .then((data) => {
            if (data.message) {
              setError(data.message)
            } else {
              console.info(`query: ${queryString} - fresh results`)
              setSearchResults(data)

              try {
                searchCache.put(queryString, new Response(JSON.stringify(data)))
              } catch (err) {
                console.warn(
                  `Failed to add search response to cache: ${err.message}`
                )
              }
            }
          })
      }
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, queryString])

  useEffect(() => {
    Promise.allSettled(
      results.map(
        ({ login }) =>
          new Promise((resolve, reject) => {
            userCache.match(login).then((cachedUser) => {
              if (cachedUser) {
                cachedUser.json().then(resolve)
              } else {
                fetch(`https://api.github.com/users/${login}`)
                  .then((results) => results.json())
                  .then((data) => {
                    if (data.message) {
                      setError(data.message)
                      reject(data.message)
                    } else {
                      console.info(`profile: ${login} - fresh fetch`)
                      userCache.put(login, new Response(JSON.stringify(data)))
                      resolve(data)
                    }
                  })
              }
            })
          })
      )
    ).then((promiseResults) => {
      setUserList(
        promiseResults
          .filter((x) => x.status === 'fulfilled')
          .map((x) => x.value)
      )
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  if (totalCount === undefined) {
    return <Text>Loading</Text>
  }

  return (
    <Box py="24px">
      <Box maxWidth="1012px" m="auto" p="40px">
        {error && (
          <Box p="8px" backgroundColor="#ff0000">
            <Text color="white">{error}</Text>
          </Box>
        )}
        <Flex alignItems="center" justifyContent="space-between">
          <ResultCount count={totalCount} />
          <SortSelect setSortOrder={setSortOrder} sortOptions={sortOptions} />
        </Flex>
        {userList ? (
          <UserList query={query} users={userList} />
        ) : (
          <h1>Loading Users</h1>
        )}
        <Pagination
          pageCount={Math.ceil(totalCount / 10)}
          currentPage={page}
          onPageChange={(e, value) => setPage(value)}
        />
      </Box>
    </Box>
  )
}

ResultsPage.propTypes = {
  searchCache: PropTypes.object,
  userCache: PropTypes.object,
}

export default ResultsPage
