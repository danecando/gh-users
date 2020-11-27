import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@primer/components/lib/Button'
import Flex from '@primer/components/lib/Flex'
import Box from '@primer/components/lib/Box'
import StyledOcticon from '@primer/components/lib/StyledOcticon'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react'
import pageRange from '../lib/pageRange'

const PageLink = styled.a`
  padding: 5px 10px;
  line-height: 20px;
  color: ${(props) => (props.disabled ? '#ddd' : 'rgb(3, 102, 214)')};
  border: 1px solid transparent;
  border-radius: 6px;
  transition: border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1) 0s;
  text-decoration: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    border-color: rgb(234, 236, 239)
    transition-duration: 0.1s;
  }
`

const PageButton = styled(Button)`
  background-color: ${(props) => (props.current ? 'rgb(3, 102, 214)' : '#fff')};
  color: ${(props) => (props.current ? '#fff' : 'rgb(3, 102, 214)')};
  cursor: ${(props) => (props.current ? 'default' : 'pointer')};
  margin: 0 2px;

  &:hover {
    background-color: ${(props) =>
      props.current ? 'rgb(3, 102, 214)' : '#fff'};
  }
`

function Pagination({ pageCount, currentPage = 1, onPageChange }) {
  const pages = pageRange(currentPage, pageCount)

  return (
    <Flex justifyContent="space-between">
      <PageLink
        href="#prev-page"
        disabled={currentPage === 1}
        onClick={(e) => {
          e.preventDefault()
          if (currentPage > 1) {
            onPageChange(e, currentPage - 1)
          }
        }}
      >
        <StyledOcticon icon={ChevronLeftIcon} /> Previous
      </PageLink>
      <Box>
        {pages.map((p) => {
          const isCurrent = p === currentPage
          const isEllipses = isNaN(p)
          return (
            <PageButton
              current={isCurrent}
              disabled={isEllipses}
              onClick={(e) => {
                if (!isCurrent) {
                  onPageChange(e, p)
                }
              }}
            >
              {p}
            </PageButton>
          )
        })}
      </Box>
      <PageLink
        href="#next-page"
        disabled={pageCount === currentPage}
        onClick={(e) => {
          e.preventDefault()
          if (currentPage < pageCount) {
            onPageChange(e, currentPage + 1)
          }
        }}
      >
        Next <StyledOcticon icon={ChevronRightIcon} />
      </PageLink>
    </Flex>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
}

export default Pagination
