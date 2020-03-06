import { batch } from 'react-redux';

import fetchCharacters from '../../services/characters';

// -- Action Types
const SET_CHARACTERS_LOADING = 'tmj-lediehl/SET_CHARACTERS_LOADING';
const SET_CHARACTERS_DATA = 'tmj-lediehl/SET_CHARACTERS_DATA';
const SET_CHARACTERS_ERROR = 'tmj-lediehl/SET_CHARACTERS_ERROR';
const SET_CHARACTERS_FILTERS = 'tmj-lediehl/SET_CHARACTERS_FILTERS';
const SET_CHARACTERS_PAGINATION = 'tmj-lediehl/SET_CHARACTERS_PAGINATION';
const RESET_CHARACTERS_PAGINATION = 'tmj-lediehl/RESET_CHARACTERS_PAGINATION';
const SET_CHARACTERS_LAST_SEARCH = 'tmj-lediehl/SET_CHARACTERS_LAST_SEARCH';

// -- Reducer
const initialState = {
  data: {
    results: [],
    total: 0,
  },
  loading: false,
  error: false,
  filters: {
    search: '',
  },
  pagination: {
    resultsPerPage: 20,
    currentPage: 0,
    sort: {
      field: 'name',
      order: 'ASC',
    },
  },
  lastSearch: '',
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CHARACTERS_LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }
    case SET_CHARACTERS_DATA: {
      return {
        ...state,
        data: payload,
        error: false,
      };
    }
    case SET_CHARACTERS_ERROR: {
      return {
        ...state,
        error: !!payload,
      };
    }
    case SET_CHARACTERS_FILTERS: {
      return {
        ...state,
        filters: payload,
      };
    }
    case SET_CHARACTERS_PAGINATION: {
      return {
        ...state,
        pagination: payload,
      };
    }
    case RESET_CHARACTERS_PAGINATION: {
      return {
        ...state,
        pagination: initialState.pagination,
      };
    }
    case SET_CHARACTERS_LAST_SEARCH: {
      return {
        ...state,
        lastSearch: payload,
      };
    }
    default:
      return state;
  }
}

// -- Action Creators
export const setCharactersLoading = (value) => ({
  type: SET_CHARACTERS_LOADING,
  payload: value,
});

export const setCharactersData = (data) => ({
  type: SET_CHARACTERS_DATA,
  payload: data,
});

export const setCharactersError = (error) => ({
  type: SET_CHARACTERS_ERROR,
  payload: error,
});

export const setCharactersPagination = (pagination) => ({
  type: SET_CHARACTERS_PAGINATION,
  payload: pagination,
});

export const resetCharactersPagination = () => ({
  type: RESET_CHARACTERS_PAGINATION,
});

export const setCharactersFilters = (filters) => ({
  type: SET_CHARACTERS_FILTERS,
  payload: filters,
});

export const setCharactersLastSearch = (key) => ({
  type: SET_CHARACTERS_LAST_SEARCH,
  payload: key,
});

// -- Middleware
export function getCharacters(filters, pagination, lastSearch) {
  return (dispatch) => {
    const currentSearch = JSON.stringify({ filters, pagination });

    // We don't want to keep fetching the same data
    if (lastSearch === currentSearch) {
      return;
    }

    dispatch(setCharactersLoading(true));

    fetchCharacters(filters, pagination)
      .then((result) => {
        const { results, total } = result;

        batch(() => {
          dispatch(setCharactersLastSearch(currentSearch));
          dispatch(setCharactersData({ results, total }));
          dispatch(setCharactersLoading(false));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(setCharactersError(error));
          dispatch(setCharactersLoading(false));
        });
      });
    // I'm not dispatching the loading state at the 'finally'
    // to be able to use the 'batch' functionality
  };
}
