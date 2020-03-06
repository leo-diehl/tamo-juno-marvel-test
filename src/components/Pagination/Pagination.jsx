import React from 'react';
import PropTypes from 'prop-types';

import ReactPaginate from 'react-paginate';

import styled from 'styled-components';

function Pagination({
  initialPage,
  pageCount,
  onPageChange,
}) {
  return (
    <PaginationContainer>
      <ReactPaginate
        initialPage={initialPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
        // Fixed props
        previousLabel="<"
        nextLabel=">"
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
      />
    </PaginationContainer>
  );
}

// -- Styles
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  color: #151515;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
  }

  li {
    a {
      cursor: pointer;
      padding: 4px 12px;
      margin: 0 4px;

      outline: none;

      transition: background 0.3s ease;

      &:hover {
        background: rgba(0,0,0,0.15)
      }
    }

    &.selected {
      a {
        border: 2px solid #151515;
      }
    }
  }
`;

// -- Props
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  initialPage: 0,
};

export default Pagination;
