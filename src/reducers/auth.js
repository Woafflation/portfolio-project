import { get } from 'lodash';

import {
  AUTH_CHECK_SUCCEEDED,
  AUTH_ERROR,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED, REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUESTED,
  REFRESH_TOKEN_SUCCEEDED, SET_TOKEN,
} from 'actionTypes';
import { AuthStatus } from 'utils/enums';

/**
 * @type {AuthState}
 */
export const authInitState = {
  user: null,
  token: null,
  status: AuthStatus.CHECKING,
  error: null,
  refreshTokenPromise: null,
};

/**
 * @param {AuthState} state
 * @param {string} type
 * @param {*} payload
 * @return {AuthState}
 */
export const auth = (state = authInitState, { type, payload = {} }) => {
  switch (type) {
    case LOGIN_SUCCEEDED:
    case AUTH_CHECK_SUCCEEDED:
      return { ...state, ...payload, status: AuthStatus.LOGGED_IN, error: null };
    case LOGOUT_SUCCEEDED:
      return { ...authInitState, status: AuthStatus.GUEST };
    case AUTH_ERROR:
      return { ...authInitState, status: AuthStatus.GUEST, error: payload };
    case REFRESH_TOKEN_REQUESTED:
      return { ...state, refreshTokenPromise: payload };
    case REFRESH_TOKEN_FAILED:
      return { ...state, refreshTokenPromise: null };
    case REFRESH_TOKEN_SUCCEEDED:
      return { ...state, token: get(payload, `token`), refreshTokenPromise: null };
    case SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
