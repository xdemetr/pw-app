import {authAPI} from '../../api/PWApi';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';
import {stopSubmit} from 'redux-form';

const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
const LOGOUT_USER = 'LOGOUT_USER';

let initialState = {
  isAuth: false,
  user: {},
  loading: false,
  error: null
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
        isAuth: false,
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
        dispatch(userError(err.response.data))
      });
};

export const login = (email, password) => (dispatch) => {
  dispatch(userRequested());

  setTimeout(() => {
    authAPI.login(email, password)
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
          dispatch(stopSubmit("login",
              {_error: err.response.data}
          ));
          dispatch(userError(err.response.data))
        })
  }, 1000);
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(userLoaded({}));
  dispatch(userLogout());
};

export default authReducer;
