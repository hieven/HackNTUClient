import {
  ADD_MOOD, ADD_MOOD_SUCCESS, ADD_MOOD_FAIL,
  FETCH_MOODS, FETCH_MOODS_SUCCESS, FETCH_MOODS_FAIL
} from './actionTypes';

export function fetchMoods() {
  return {
    types: [FETCH_MOODS, FETCH_MOODS_SUCCESS, FETCH_MOODS_FAIL],
    promise: (client) => client.get(`/moods`)
  };
}

export function addMood(mood) {
  return {
    types: [ADD_MOOD, ADD_MOOD_SUCCESS, ADD_MOOD_FAIL],
    promise: (client) => client.post('/moods', {
      data: {
        mood: mood
      }
    })
  };
}
