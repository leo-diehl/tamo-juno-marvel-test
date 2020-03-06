import { createSelector } from 'reselect';

export const getCharacterId = createSelector(
  ({ character }) => character.data,
  (data) => data && data.id,
);

export const getCharacterData = createSelector(
  ({ character }) => character.data,
  (data) => data || {},
);

export const getCharacterLoading = createSelector(
  ({ character }) => character.data.loading,
  (loading) => loading,
);

export const getCharacterError = createSelector(
  ({ character }) => character.data.error,
  (error) => error,
);

export const getCharacterDetailsData = createSelector(
  ({ character }) => character.details,
  (details) => details || {
    comics: {},
    events: {},
    series: {},
    stories: {},
  },
);
