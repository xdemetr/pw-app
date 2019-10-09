import {authAPI, userAPI} from '../../api/PWApi';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';
import {stopSubmit} from 'redux-form';

const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';


let initialState = {
  isAuth: false,
  user: {},
  profile: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
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

    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        loading: false
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

export const userLogout = () => {
  return {
    type: LOGOUT_USER
  }
};

const profileRequested = () => {
  return {
    type: GET_PROFILE_REQUEST
  }
};

export const profileLoaded = (profile) => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: profile
  }
};

export const registration = (username, email, password) => (dispatch) => {
  dispatch(userRequested());

  authAPI.registration(username, email, password)
      .then(res => {
        if (res.status === 201) {
          const { id_token } = res.data;
          const decoded = jwtDecode(id_token);

          localStorage.setItem('jwtToken', id_token);
          setAuthToken(id_token);

          dispatch(userLoaded(decoded));
        }
      })
      .catch(err => {
        dispatch(stopSubmit('registration',
            {_error: err.response.data}
        ));
      });
};

export const login = (email, password) => (dispatch) => {
  dispatch(userRequested());

  authAPI.login(email, password)
      .then(res => {
        if (res.status === 201) {
          const { id_token } = res.data;
          const decoded = jwtDecode(id_token);

          localStorage.setItem('jwtToken', id_token);
          setAuthToken(id_token);
          dispatch(userLoaded(decoded));

          getAuthUser(id_token);
        }
      })
      .catch(err => {
        dispatch(stopSubmit("login",
            {_error: err.response.data}
        ));
      })
};

export const getAuthUser = (token = localStorage.getItem('jwtToken')) => (dispatch) => {
  if (token) {
    dispatch(profileRequested());

    userAPI.profile(token)
        .then(res => {
          dispatch(profileLoaded(res.data.user_info_token));
        })
        .catch(err => console.log(err.response))
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(userLoaded({}));
  dispatch(userLogout());
};

export default authReducer;
