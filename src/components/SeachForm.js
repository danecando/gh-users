import 'styled-components/macro'
import TextInput from '@primer/components/lib/TextInput'
import Button from '@primer/components/lib/Button'
import Flex from '@primer/components/lib/Flex'

function SearchForm() {
  return (
    <form id="search_form" action="/search" method="get">
      <Flex my="16px">
        <TextInput
          aria-label="Search"
          name="q"
          placeholder="Search GitHub"
          width="100%"
        />
        <Button ml="8px" type="submit">
          Search
        </Button>
      </Flex>
    </form>
  )
}

export default SearchForm
