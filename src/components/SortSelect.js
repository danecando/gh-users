import PropTypes from 'prop-types'
import Box from '@primer/components/lib/Box'
import Text from '@primer/components/lib/Text'

function SortSelect({ sortOptions, setSort }) {
  return (
    <Box>
      <Text>Sort: </Text>
      <select
        name="sort"
        id="user-sort"
        onChange={(e) => setSort(e.target.value)}
      >
        {sortOptions.map((opt) => {
          const key = opt.split(' ').join('_').toLowerCase()
          return (
            <option key={key} value={key}>
              {opt}
            </option>
          )
        })}
      </select>
    </Box>
  )
}

SortSelect.propTypes = {
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSort: PropTypes.func.isRequired,
}

export default SortSelect
