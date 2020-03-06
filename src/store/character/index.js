import { batch } from 'react-redux';

import {
  getCharacterById,
  getCharacterDetails as serviceGetCharacterDetails,
} from '../../services/characters';

// -- Action Types
const SET_CHARACTER_LOADING = 'tmj-lediehl/SET_CHARACTER_LOADING';
const SET_CHARACTER_DATA = 'tmj-lediehl/SET_CHARACTER_DATA';
const SET_CHARACTER_ERROR = 'tmj-lediehl/SET_CHARACTER_ERROR';
const SET_CHARACTER_DETAILS_LOADING = 'tmj-lediehl/SET_CHARACTER_DETAILS_LOADING';
const SET_CHARACTER_DETAILS_DATA = 'tmj-lediehl/SET_CHARACTER_DETAILS_DATA';
const SET_CHARACTER_DETAILS_ERROR = 'tmj-lediehl/SET_CHARACTER_DETAILS_ERROR';
const RESET_CHARACTER_DETAILS = 'tmj-lediehl/RESET_CHARACTER_DETAILS';

// -- Reducer
const initialState = {
  id: null,
  data: {},
  details: {
    comics: {},
    events: {},
    series: {},
    stories: {},
  },
};

export default function reducer(state = initialState, { type, payload, detail }) {
  switch (type) {
    case SET_CHARACTER_LOADING: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: payload,
        },
      };
    }
    case SET_CHARACTER_DATA: {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
          error: false,
        },
      };
    }
    case SET_CHARACTER_ERROR: {
      return {
        ...state,
        data: {
          ...state.data,
          error: payload,
        },
      };
    }
    case SET_CHARACTER_DETAILS_LOADING: {
      return {
        ...state,
        details: {
          ...state.details,
          [detail]: {
            ...state.details[detail],
            loading: payload,
          },
        },
      };
    }
    case SET_CHARACTER_DETAILS_DATA: {
      return {
        ...state,
        details: {
          ...state.details,
          [detail]: {
            ...state.details[detail],
            data: payload,
            error: false,
          },
        },
      };
    }
    case SET_CHARACTER_DETAILS_ERROR: {
      return {
        ...state,
        details: {
          ...state.details,
          [detail]: {
            ...state.details[detail],
            error: !!payload,
          },
        },
      };
    }
    case RESET_CHARACTER_DETAILS: {
      return {
        ...state,
        details: initialState.details,
      };
    }
    default: {
      return state;
    }
  }
}

// -- Action Creators
export const setCharacterLoading = (value) => ({
  type: SET_CHARACTER_LOADING,
  payload: value,
});

export const setCharacterData = (data) => ({
  type: SET_CHARACTER_DATA,
  payload: data,
});

export const setCharacterError = (error) => ({
  type: SET_CHARACTER_ERROR,
  payload: error,
});

export const setCharacterDetailsLoading = (value, detail) => ({
  type: SET_CHARACTER_DETAILS_LOADING,
  payload: value,
  detail,
});

export const setCharacterDetailsData = (data, detail) => ({
  type: SET_CHARACTER_DETAILS_DATA,
  payload: data,
  detail,
});

export const setCharacterDetailsError = (error, detail) => ({
  type: SET_CHARACTER_DETAILS_ERROR,
  payload: error,
  detail,
});

export const resetCharacterDetails = () => ({
  type: RESET_CHARACTER_DETAILS,
});

// Middleware
export function fetchCharacter(characterId) {
  return (dispatch) => {
    dispatch(resetCharacterDetails());
    dispatch(setCharacterLoading(true));

    getCharacterById(characterId)
      .then((data) => {
        batch(() => {
          dispatch(setCharacterData(data));
          dispatch(setCharacterLoading(false));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(setCharacterError(error));
          dispatch(setCharacterLoading(false));
        });
      });
    // I'm not dispatching the loading state at the 'finally'
    // to be able to use the 'batch' functionality
  };
}

export function fetchCharacterDetails(characterId, detail) {
  return (dispatch) => {
    dispatch(setCharacterDetailsLoading(true, detail));

    serviceGetCharacterDetails(characterId, detail)
      .then((data) => {
        batch(() => {
          dispatch(setCharacterDetailsData(data, detail));
          dispatch(setCharacterDetailsLoading(false, detail));
        });
      })
      .catch((error) => {
        batch(() => {
          dispatch(setCharacterDetailsError(error, detail));
          dispatch(setCharacterDetailsLoading(false, detail));
        });
      });
    // I'm not dispatching the loading state at the 'finally'
    // to be able to use the 'batch' functionality
  };
}
