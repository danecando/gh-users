import 'styled-components/macro'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '@primer/components/lib/Box'
import Button from '@primer/components/lib/Button'
import Flex from '@primer/components/lib/Flex'
import Text from '@primer/components/lib/Text'
import Avatar from '@primer/components/lib/Avatar'
import Link from '@primer/components/lib/Link'

const Username = styled(Text)`
  font-weight: ${({ isMatch }) => (isMatch ? 600 : 400)};
  color: #666;
`

function UserList({ query, users }) {
  return (
    <Box py="24px">
      {users.map((user) => (
        <Flex
          css={`
            border-top: 1px solid #ddd;
          `}
          alignItems="flex-start"
          py="24px"
        >
          <Avatar
            src={user.avatar_url}
            alt={`${user.name}'s Avatar`}
            mr="8px"
          />
          <Flex flexGrow="1" flexDirection="column">
            <Flex justifyContent="space-between" flexGrow="1">
              <Flex>
                <Link href={user.html_url} mr="8px" target="_blank">
                  {user.name}
                </Link>
                <Link href={user.html_url} target="_blank">
                  <Username isMatch={user.login.includes(query)}>
                    {user.login}
                  </Username>
                </Link>
              </Flex>
              <Button variant="small" disabled>
                Follow
              </Button>
            </Flex>
            {user.bio && (
              <Box mb="4px">
                <Text fontSize="14px">{user.bio}</Text>
              </Box>
            )}
            <Flex>
              <Text fontSize="12px" lineHeight="1.5" color="#555">
                {user.location}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
}

export default UserList
