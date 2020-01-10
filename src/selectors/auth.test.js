import {
  authSelector,
  authStatusSelector,
  refreshPromiseSelector,
  tokenSelector,
  userNameSelector,
  userSelector,
} from 'selectors/auth';
import { AuthStatus } from 'utils/enums';

/**
 * @type {RootState}
 */
const state = {
  auth: {
    user: {
      id: 1,
      name: `test`,
      email: `test@test.ru`,
    },
    token: `testToken`,
    status: AuthStatus.LOGGED_IN,
    refreshTokenPromise: null,
  },
};

describe(`Auth selectors`, () => {
  it(`authSelector`, () => {
    expect(authSelector(state)).toEqual(state.auth);
  });

  it(`tokenSelector`, () => {
    expect(tokenSelector(state)).toBe(state.auth.token);
  });

  it(`authStatusSelector`, () => {
    expect(authStatusSelector(state)).toBe(state.auth.status);
  });

  it(`userSelector`, () => {
    expect(userSelector(state)).toBe(state.auth.user);
  });

  it(`userNameSelector`, () => {
    expect(userNameSelector(state)).toBe(state.auth.user.name);
  });

  it(`refreshPromiseSelector`, () => {
    expect(refreshPromiseSelector(state)).toBe(state.auth.refreshTokenPromise);
  });
});
