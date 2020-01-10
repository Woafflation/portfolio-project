import React from 'react';

import ErrorPage from 'components/ErrorPage';

const NotFoundPage = () => (
  <ErrorPage
    errorCode="404"
    title="Oops.. You just found an error page.."
    icon="fa fa-warning"
    text="We are sorry but the page you are looking for was not found.."
  />
);

export default NotFoundPage;
