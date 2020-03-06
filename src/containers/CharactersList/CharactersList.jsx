import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Redux
import { connect, batch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCharacters,
  setCharactersPagination as actionSetCharactersPagination,
  resetCharactersPagination as actionResetCharactersPagination,
  setCharactersFilters as actionSetCharactersFilters,
} from '../../store/characters-list';

import {
  getCharactersData,
  getCharactersLoading,
  // getCharactersError, -- Reactivate after handling errors
  getCharactersFilters,
  getCharactersPagination,
  getCharactersTotal,
  getLastSearch,
} from '../../store/characters-list/selectors';

// Components
import Loader from '../../components/Loader/Loader';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';

function CharactersList({
  // Routing
  history,
  // State
  characters,
  charactersTotal,
  filters,
  pagination,
  loading,
  lastSearch,
  // Middleware
  fetchCharacters,
  // Actions
  setCharactersFilters,
  setCharactersPagination,
  resetCharactersPagination,
}) {
  // Lifecycle
  useEffect(() => {
    fetchCharacters(filters, pagination, lastSearch);
  }, [fetchCharacters, filters, lastSearch, pagination]);

  // Filters
  const [search, setSearch] = useState(filters.search);

  function setSearchFilter() {
    batch(() => {
      setCharactersFilters({ ...filters, search });
      resetCharactersPagination();
    });
  }

  function handleSearchChange(e) {
    const { value } = e.target;
    setSearch(value);
  }

  // Paging
  const { currentPage, resultsPerPage/* ,  sort */ } = pagination;
  const pageCount = Math.floor(charactersTotal / resultsPerPage) + 1;

  function handlePageChanged({ selected }) {
    if (selected === currentPage) {
      return;
    }

    const newPagination = { ...pagination, currentPage: selected };
    setCharactersPagination(newPagination);
  }

  // Character
  const characterRoute = '/characters';

  function handleCharacterClick(id) {
    history.push(`${characterRoute}/${id}`, { id });
  }

  // Digest characters data to be displayed inside cards
  function charactersForCard() {
    return characters.map((char) => ({
      id: char.id,
      title: char.name,
      description: char.description,
      figure: {
        src: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        alt: `Marvel's character ${char.name} thumbnail`,
      },
    }));
  }

  return (
    <div>
      <FiltersContainer>
        <Input
          value={search}
          onChange={handleSearchChange}
        />
        <Button onClick={setSearchFilter}>
          Search
        </Button>
      </FiltersContainer>
      <ListContainer>
        {loading
          ? <Loader />
          : (
            <div>
              <CardList
                data={charactersForCard()}
                onCardClick={handleCharacterClick}
              />
              {
                pageCount > 1 && (
                <Pagination
                  pageCount={pageCount}
                  initialPage={currentPage}
                  onPageChange={handlePageChanged}
                />
                )
              }

            </div>
          )}
      </ListContainer>

    </div>
  );
}

// -- Styles
const FiltersContainer = styled.div`
  display: flex;
  margin: 24px 0 16px 0;

  input {
    margin-right: 8px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// -- Props
CharactersList.propTypes = {
  // State
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  charactersTotal: PropTypes.number.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  pagination: PropTypes.shape({
    resultsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    sort: {
      field: PropTypes.string.isRequired,
      order: PropTypes.string.isRequired,
    },
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  lastSearch: PropTypes.string.isRequired,
  // Route
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // Middleware
  fetchCharacters: PropTypes.func.isRequired,
  // Actions
  setCharactersFilters: PropTypes.func.isRequired,
  setCharactersPagination: PropTypes.func.isRequired,
  resetCharactersPagination: PropTypes.func.isRequired,
};

// -- Redux
const mapStateToProps = (state) => ({
  loading: getCharactersLoading(state),
  characters: getCharactersData(state),
  filters: getCharactersFilters(state),
  pagination: getCharactersPagination(state),
  charactersTotal: getCharactersTotal(state),
  lastSearch: getLastSearch(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchCharacters: getCharacters,
    setCharactersFilters: actionSetCharactersFilters,
    setCharactersPagination: actionSetCharactersPagination,
    resetCharactersPagination: actionResetCharactersPagination,
  },
  dispatch,
);

// -----
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
