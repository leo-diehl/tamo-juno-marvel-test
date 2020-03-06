import { createSelector } from 'reselect';

export const getCharactersData = createSelector(
  ({ characters }) => (characters.data ? characters.data.results : []),
  (data) => data || [],
);

export const getCharactersLoading = createSelector(
  ({ characters }) => characters.loading,
  (loading) => loading,
);

export const getCharactersError = createSelector(
  ({ characters }) => characters.error,
  (error) => error,
);

export const getCharactersFilters = createSelector(
  ({ characters }) => characters.filters,
  (filters) => filters,
);

export const getCharactersPagination = createSelector(
  ({ characters }) => characters.pagination,
  (pagination) => pagination,
);

export const getCharactersTotal = createSelector(
  ({ characters }) => (characters.data ? characters.data.total : 0),
  (total) => total || 0,
);

export const getLastSearch = createSelector(
  ({ characters }) => characters.lastSearch,
  (lastSearch) => lastSearch || '',
);
