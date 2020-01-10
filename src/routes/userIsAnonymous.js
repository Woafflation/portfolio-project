import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import { authStatusSelector } from 'selectors/auth';
import { AuthStatus } from 'utils/enums';

const userIsAnonymous = connectedRouterRedirect({
  redirectPath: `/`,
  authenticatedSelector: (state) => {
    const status = authStatusSelector(state);

    return status === AuthStatus.GUEST;
  },
  wrapperDisplayName: `UserIsAnonymous`,
  allowRedirectBack: false,
});

export default userIsAnonymous;
