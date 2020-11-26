import 'styled-components/macro'
import Flex from '@primer/components/lib/Flex'

function NotFoundPage() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={`
        width: 100%;
        min-height: 100vh;
      `}
    >
      <h1>404: Page Not Found</h1>
    </Flex>
  )
}

export default NotFoundPage
