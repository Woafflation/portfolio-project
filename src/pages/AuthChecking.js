import React from 'react';
import useMount from 'react-use/lib/useMount';
import { useDispatch } from 'react-redux';

import { authCheckRequest } from 'actions/auth';

const AuthChecking = () => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(authCheckRequest());
  });

  return <div id="page-loader" className="show"/>;
};

export default AuthChecking;
