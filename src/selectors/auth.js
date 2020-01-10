import { createSelector } from 'reselect';
import { get, map, includes } from 'lodash';

export const authSelector = (state) => state.auth;

/**
 * @type {OutputSelector<RootState, AuthState, string|null>}
 */
export const tokenSelector = createSelector(
  authSelector,
  ({ token }) => token,
);

/**
 * @type {OutputSelector<RootState, AuthState, AuthStatus>}
 */
export const authStatusSelector = createSelector(
  authSelector,
  ({ status }) => status,
);

/**
 * @type {OutputSelector<RootState, AuthState, User>}
 */
export const userSelector = createSelector(
  authSelector,
  ({ user }) => user || {},
);

/**
 * @type {OutputSelector<RootState, AuthState, string|null>}
 */
export const userNameSelector = createSelector(
  userSelector,
  (user) => get(user, `name`),
);

/**
 * @type {OutputSelector<RootState, AuthState, string|null>}
 */
export const refreshPromiseSelector = createSelector(
  authSelector,
  ({ refreshTokenPromise }) => refreshTokenPromise,
);

export const userPermissionsSelector = createSelector(
  userSelector,
  (user) => map(get(user, `permissions`), (permission) => get(permission, `slug`)),
);

/**
 * @param {Permission} permission
 * @return {OutputSelector}
 */
export const hasAccessSelector = (permission) => createSelector(
  userPermissionsSelector,
  (permissions) => includes(permissions, permission),
);
