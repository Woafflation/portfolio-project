import {
  AUTH_CHECK_REQUESTED,
  CHANGE_PASSWORD_REQUESTED,
  LOGIN_REQUESTED, LOGOUT_REQUESTED,
  REFRESH_TOKEN_REQUESTED,
} from 'actionTypes';

/**
 * @param {LoginFormData} payload
 * @return {IAction}
 */
export const loginRequest = (payload) => ({ type: LOGIN_REQUESTED, payload });

/**
 * @return {IAction}
 */
export const authCheckRequest = () => ({ type: AUTH_CHECK_REQUESTED });

/**
 * @param {AxiosPromise} promise
 * @return {IAction}
 */
export const refreshTokenRequest = (promise) => ({ type: REFRESH_TOKEN_REQUESTED, payload: promise });

/**
 * @param {ChangePasswordFormData} data
 * @return {IAction}
 */
export const changePasswordRequest = (data) => ({ type: CHANGE_PASSWORD_REQUESTED, payload: data });

export const logoutRequest = () => ({ type: LOGOUT_REQUESTED });
