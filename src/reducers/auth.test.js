import {
  AUTH_CHECK_SUCCEEDED,
  AUTH_ERROR,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED, REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUESTED,
  REFRESH_TOKEN_SUCCEEDED, SET_TOKEN,
} from 'actionTypes';
import { auth, authInitState } from 'reducers/auth';
import { AuthStatus } from 'utils/enums';

describe(`Auth reducer`, () => {
  it(LOGIN_SUCCEEDED, () => {
    const payload = {
      user: {
        id: 1,
        name: `test`,
        email: `test@test.ru`,
      },
      token: `test`,
    };

    expect(auth(authInitState, { type: LOGIN_SUCCEEDED, payload }))
      .toEqual({ ...authInitState, ...payload, status: AuthStatus.LOGGED_IN, error: null });
  });

  it(AUTH_CHECK_SUCCEEDED, () => {
    const payload = {
      user: {
        id: 1,
        name: `test`,
        email: `test@test.ru`,
      },
    };

    expect(auth(authInitState, { type: AUTH_CHECK_SUCCEEDED, payload }))
      .toEqual({ ...authInitState, ...payload, status: AuthStatus.LOGGED_IN, error: null });
  });

  it(LOGOUT_SUCCEEDED, () => {
    expect(auth({ user: { id: 1, name: `test`, email: `test` }, token: `test` }, { type: LOGOUT_SUCCEEDED }))
      .toEqual({ ...authInitState, status: AuthStatus.GUEST });
  });

  it(AUTH_ERROR, () => {
    const payload = `someError`;

    expect(auth({ user: { id: 1, name: `test`, email: `test` }, token: `test` }, { type: AUTH_ERROR, payload }))
      .toEqual({ ...authInitState, status: AuthStatus.GUEST, error: payload });
  });

  it (REFRESH_TOKEN_SUCCEEDED, () => {
    expect(auth(authInitState, { type: REFRESH_TOKEN_SUCCEEDED, payload: { token: `test` } }))
      .toEqual({ ...authInitState, token: `test`, refreshTokenPromise: null });
  });

  it (REFRESH_TOKEN_REQUESTED, () => {
    const payload = new Promise(() => {});
    expect(auth(authInitState, { type: REFRESH_TOKEN_REQUESTED, payload }))
      .toEqual({ ...authInitState, refreshTokenPromise: payload });
  });

  it (REFRESH_TOKEN_FAILED, () => {
    expect(auth(authInitState, { type: REFRESH_TOKEN_FAILED }))
      .toEqual({ ...authInitState, refreshTokenPromise: null });
  });

  it (SET_TOKEN, () => {
    const token = `testToken`;
    expect(auth(authInitState, { type: SET_TOKEN, payload: token }))
      .toEqual({ ...authInitState, token });
  });
});
