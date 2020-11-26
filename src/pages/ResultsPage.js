import 'styled-components/macro'
import Flex from '@primer/components/lib/Flex'

function ResultsPage() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={`
        width: 100%;
        min-height: 100vh;
      `}
    >
      <h1>Results Page</h1>
    </Flex>
  )
}

export default ResultsPage
