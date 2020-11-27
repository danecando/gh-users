import PropTypes from 'prop-types'
import Box from '@primer/components/lib/Box'
import Text from '@primer/components/lib/Text'

function SortSelect({ sortOptions, setSortOrder }) {
  return (
    <Box>
      <Text>Sort: </Text>
      <select
        name="sort"
        id="user-sort"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        {sortOptions.map((opt) => {
          const key = `${opt.sort}_${opt.order}`
          return (
            <option key={key} value={key}>
              {opt.label}
            </option>
          )
        })}
      </select>
    </Box>
  )
}

SortSelect.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setSortOrder: PropTypes.func.isRequired,
}

export default SortSelect
