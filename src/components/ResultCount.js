import PropTypes from 'prop-types'
import Box from '@primer/components/lib/Box'
import Text from '@primer/components/lib/Text'

function ResultCount({ count }) {
  return (
    <Box>
      <Text as="h3">{count} users</Text>
    </Box>
  )
}

ResultCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default ResultCount
