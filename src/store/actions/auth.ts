import {AppActions} from '../../types';
import {
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT_USER
} from '../../types/authActions';
import {Dispatch} from 'react';
import {authAPI, userAPI} from '../../api/PWApi';
import {stopSubmit} from 'redux-form';
import ITokenJWT from '../../types/ITokenJWT';
import IProfile from '../../types/IProfile';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/set-auth-token';

const userRequested = ():AppActions => ({
  type: AUTH_USER_REQUEST
});

export const userLoaded = (decoded:ITokenJWT):AppActions => ({
  type: AUTH_USER_SUCCESS,
  auth: decoded
});

export const userLogout = ():AppActions => ({
  type: LOGOUT_USER
});

const profileRequested = ():AppActions => ({
  type: GET_PROFILE_REQUEST
});

const profileLoaded = (profile: IProfile):AppActions => ({
  type: GET_PROFILE_SUCCESS,
  profile
});

const setAuthUser = (dispatch:Dispatch<AppActions>, token:string) => {
  const decoded = jwtDecode<ITokenJWT>(token);
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
  dispatch(userLoaded(decoded));
  getAuthUser(token);
};

export const registration = (username:string, email:string, password:string) => async (dispatch:Dispatch<AppActions>) => {
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

export const login = (email:string, password:string) => async (dispatch:Dispatch<AppActions>) => {
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

export const getAuthUser = (token:string) => async (dispatch:Dispatch<AppActions>) => {
    const res = await userAPI.profile(token);
    dispatch(profileRequested());
    dispatch(profileLoaded(res.data.user_info_token));
};

export const logoutUser = () => (dispatch:any) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(userLogout());
};
