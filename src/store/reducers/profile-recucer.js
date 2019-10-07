import {authAPI, userAPI} from '../../api/PWApi';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';
import {stopSubmit} from 'redux-form';

const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
  name: null,
  email: null,
  balance: null,
  id: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false
      };
    }

    case AUTH_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        profile: {},
        isAuth: false,
        loading: false
      }
    }

    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload
      }
    }

    default:
      return state;
  }
};

const userRequested = () => {
  return {
    type: AUTH_USER_REQUEST
  }
};

export const userLoaded = (decoded) => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: decoded
  }
};

const userError = (error) => {
  return {
    type: AUTH_USER_FAILURE,
    payload: error
  }
};

export const userLogout = () => {
  return {
    type: LOGOUT_USER
  }
};

export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile
  }
};


export default profileReducer;
