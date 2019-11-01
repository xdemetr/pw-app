import ITokenJWT from './ITokenJWT';
import IProfile from './IProfile';

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export interface userRequested {
    type: typeof AUTH_USER_REQUEST
}

export interface userLoaded {
    type: typeof AUTH_USER_SUCCESS
    auth: ITokenJWT
}

export interface userError {
    type: typeof AUTH_USER_FAILURE
    error: string
}

export interface userLogout {
    type: typeof LOGOUT_USER
}

export interface profileRequested {
    type: typeof GET_PROFILE_REQUEST
}

export interface profileLoaded {
    type: typeof GET_PROFILE_SUCCESS
    profile: IProfile
}

export type AuthActionTypes =
    | userRequested
    | userLoaded
    | userError
    | userLogout
    | profileRequested
    | profileLoaded
