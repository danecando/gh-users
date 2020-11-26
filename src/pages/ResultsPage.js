import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@primer/components/lib/Box'
import Flex from '@primer/components/lib/Flex'
import Text from '@primer/components/lib/Text'
import UserCount from '../components/UserCount'
import SortSelect from '../components/SortSelect'
import response from '../lib/response.json'

const sortOptions = [
  'Best match',
  'Most followers',
  'Fewest followers',
  'Most recently joined',
  'Least recently joined',
  'Most repositories',
  'Fewest repositories',
]

function ResultsPage() {
  const location = useLocation()
  const [results, setResults] = useState(undefined)
  const [error, setError] = useState(null)
  const [sort, setSort] = useState('best_match')

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    document.title = `Search - ${params.get('q')}`

    setTimeout(() => {
      setResults(response)
    }, 500)

    // fetch(`https://api.github.com/search/users?q=${params.get('q')}`)
    //   .then((results) => results.json())
    //   .then((data) => {
    //     if (data.message) {
    //       setError(data.message)
    //     } else {
    //       setResults(data)
    //     }
    //   })
  })

  if (results === undefined) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <Box py="24px">
      <Box maxWidth="1012px" m="auto" p="40px">
        <Flex alignItems="center" justifyContent="space-between">
          <UserCount count={results.total_count} />
          <SortSelect setSort={setSort} sortOptions={sortOptions} />
        </Flex>
      </Box>
    </Box>
  )
}

export default ResultsPage
