import React from 'react';

import ErrorPage from 'components/ErrorPage';

const NoPermissionsPage = () => (
  <ErrorPage
    errorCode="403"
    icon="fa fa-ban"
    title="Oops.. No permissions"
  />
);

export default NoPermissionsPage;
