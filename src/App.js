import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Flex from '@primer/components/lib/Flex'
import Text from '@primer/components/lib/Text'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [cache, setCache] = useState(undefined)

  useEffect(() => {
    Promise.all([caches.open('search-cache'), caches.open('user-cache')])
      .then((c) => {
        setCache(c)
      })
      .catch((error) => {
        console.warn('Unable to load caches: ', error.message)
        setCache([null, null])
      })
  }, [])

  if (cache === undefined) {
    return (
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="h1">Loading Results...</Text>
      </Flex>
    )
  }

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/search">
          <ResultsPage searchCache={cache[0]} userCache={cache[1]} />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
