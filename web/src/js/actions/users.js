import { createAction } from 'redux-actions';

export const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const ATTEMPT_REGISTER = 'ATTEMPT_REGISTER';
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const attemptLogin = createAction(ATTEMPT_LOGIN);
export const loginStart = createAction(LOGIN_START);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailed = createAction(LOGIN_FAILED);
export const attemptRegister = createAction(ATTEMPT_REGISTER);
export const registerStart = createAction(REGISTER_START);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailed = createAction(REGISTER_FAILED);

