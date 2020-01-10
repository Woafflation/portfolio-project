import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import { authStatusSelector } from 'selectors/auth';
import { AuthStatus } from 'utils/enums';

import AuthChecking from 'pages/AuthChecking';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: `/login`,
  authenticatedSelector: (state) => {
    const status = authStatusSelector(state);

    return status === AuthStatus.LOGGED_IN;
  },
  wrapperDisplayName: `UserIsAuthenticated`,
  allowRedirectBack: false,
  authenticatingSelector: (state) => {
    const status = authStatusSelector(state);

    return status === AuthStatus.CHECKING;
  },
  AuthenticatingComponent: AuthChecking,
});

export default userIsAuthenticated;
