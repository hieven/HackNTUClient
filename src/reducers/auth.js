import {
  AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL,
  AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
  AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL,
  FBAUTH, FBAUTH_SUCCESS, FBAUTH_FAIL,
  REGISTER, REGISTER_SUCCESS, REGISTER_FAIL
} from '../actions/actionTypes';

const initialState = {
  username: 'visitor',
  loaded: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_LOAD:
      return {
        ...state,
        loading: true
      };
    case AUTH_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case AUTH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case AUTH_LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case FBAUTH:
      return {
        ...state
      };
    case FBAUTH_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    case REGISTER:
      return {
        ...state
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.result
      };
    case REGISTER_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
