import {authAPI, userAPI} from '../../api/PWApi';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';
import {stopSubmit} from 'redux-form';
import ITokenJWT from '../../models/ITokenJWT';

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

interface baseAction {
  type: string,
  payload?: any
}

interface IProfile {
  name: string,
  id: number,
  balance: number
}

const authReducer = (state = initialState, action:baseAction) => {
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

export const userLoaded = (decoded:ITokenJWT) => {
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

export const profileLoaded = (profile:IProfile) => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: profile
  }
};

const setAuthUser = (dispatch:any, token:string) => {
  const decoded = jwtDecode<ITokenJWT>(token);
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
  dispatch(userLoaded(decoded));
  getAuthUser(token);
};

export const registration = (username:string, email:string, password:string) => async (dispatch:any) => {
  dispatch(userRequested());

  const res = await authAPI.registration(username, email, password)
      .catch((err:any) => {
        dispatch(stopSubmit('registration',
            {_error: err.response.data}
        ));
      });

  if (res && res.status === 201) {
    const {id_token} = res.data;
    setAuthUser(dispatch, id_token);
  }
};

export const login = (email:string, password:string) => async (dispatch:any) => {
  dispatch(userRequested());

  const res = await authAPI.login(email, password)
      .catch((err:any) => {
        dispatch(stopSubmit("login",
            {_error: err.response.data}
        ));
      });

  if (res && res.status === 201) {
    const { id_token } = res.data;
    setAuthUser(dispatch, id_token);
  }
};

export const getAuthUser = (token = localStorage.getItem('jwtToken')) => async (dispatch:any) => {
  if (token) {
    dispatch(profileRequested());

    const res = await userAPI.profile(token);
    dispatch(profileLoaded(res.data.user_info_token));
  }
};

export const logoutUser = () => (dispatch:any) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(userLogout());
};

export default authReducer;
