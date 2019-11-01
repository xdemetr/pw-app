import {AuthActionTypes} from '../../types/authActions';

const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

interface authReducerState {
  isAuth: boolean,
  user: Object,
  profile: {},
  loading: boolean,
  error: string
}

const authReducerDefaultState:authReducerState = {
  isAuth: false,
  user: {},
  profile: {},
  loading: false,
  error: ''
};

const authReducer = (
    state = authReducerDefaultState,
    action:AuthActionTypes
):authReducerState => {

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
        user: action.auth,
        isAuth: true,
        loading: false
      }
    }

    case AUTH_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
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

    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.profile,
        loading: false
      }
    }

    default:
      return state;
  }
};

export default authReducer;
