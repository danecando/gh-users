import Flex from '@primer/components/lib/Flex'
import Box from '@primer/components/lib/Box'
import StyledOcticon from '@primer/components/lib/StyledOcticon'
import Text from '@primer/components/lib/Text'
import { SearchIcon } from '@primer/octicons-react'
import SearchForm from '../components/SeachForm'

function HomePage() {
  return (
    <Box py="120px">
      <Box maxWidth="1012px" m="auto" p="40px">
        <Box>
          <StyledOcticon icon={SearchIcon} size={24} />
          <Text fontSize="24px" fontWeight="500" ml="16px">
            Search GitHub Users
          </Text>
        </Box>
        <SearchForm />
        <Box>
          <Text fontWeight="bold">ProTip! </Text>
          <Text>Search for</Text>
          <Text fontWeight="500"> danecando</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
