import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
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
    return <h1>Loading App</h1>
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
