import React from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from 'selectors/auth';

const UserInfo = () => {
  const { name, email } = useSelector(userSelector);

  return (
    <div className="col-xl-4 col-lg-5 col-md-7">
      <div className="change-password-form js-validation-signin">
        <span className="label-settings">Ваш логин</span>
        <div className="form-control">{name}</div>
        <span className="label-settings">Ваш email</span>
        <div className="form-control">{email}</div>
      </div>
    </div>
  );
};

export default UserInfo;