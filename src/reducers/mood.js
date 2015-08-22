import {
  ADD_MOOD, ADD_MOOD_SUCCESS, ADD_MOOD_FAIL,
  FETCH_MOODS, FETCH_MOODS_SUCCESS, FETCH_MOODS_FAIL
} from '../actions/actionTypes';

const initialState = {
  emotion: '',
  depiction: '',
  moods: [],
  loaded: false
};

export default function mood(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_MOODS:
      return {
        ...state
      };

    case FETCH_MOODS_SUCCESS:
      return {
        ...state,
        moods: action.result,
        loaded: true
      };
    case FETCH_MOODS_FAIL:
      return {
        ...state,
        loaded: true
      };

    case ADD_MOOD:
      return {
        ...state,
        completed: false
      };

    case ADD_MOOD_SUCCESS:
      return {
        ...state,
        completed: true
      };
    case ADD_MOOD_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.moods && globalState.moods.loaded;
}
