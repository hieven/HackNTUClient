import superagent from 'superagent';
import {
  AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL,
  AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
  AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL,
  FBAUTH, FBAUTH_SUCCESS, FBAUTH_FAIL,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAIL
} from './actionTypes';

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/register', {
      data: data
    })
  };
}

export function load() {
  console.log('load action');
  return {
    types: [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL],
    promise: (client) => client.post('/loadAuth')
  };
}

export function login(data) {
  return {
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: data
    })
  };
}

export function logout() {
  return {
    types: [AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}


// Need to modify
function requestFbLogin() {
  return {
    type: FBAUTH
  };
}

function receiveFbLogin(data) {
  console.log(data);
  return {
    type: FBAUTH_SUCCESS,
    data: data
  };
}

export function fbLogin() {
  console.log('fbLogin');
  return dispatch => {
    dispatch(requestFbLogin());
    return fetch(`http://www.reddit.com/r/all.json`)
      .then(req => req.json())
      .then(json => dispatch(receiveFbLogin(json)));
  };
}
