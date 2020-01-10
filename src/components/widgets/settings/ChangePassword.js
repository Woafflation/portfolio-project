import React from 'react';
import { reduxForm } from 'redux-form';
import { omit } from 'lodash';

import { changePasswordRequest } from 'actions/auth';

import FormInput from 'components/form/FormInput';
import SubmitBtn from 'components/widgets/settings/SubmitBtn';
import FormField from 'components/form/FormField';

const onSubmit = (values, dispatch) => dispatch(changePasswordRequest(omit(values, [`repeat_new_password`])));

const ChangePassword = ({ handleSubmit, submitting }) => (
  <div className="col-xl-4 col-lg-5 col-md-7">
    <form className="change-password-form js-validation-signin" onSubmit={handleSubmit}>
      <FormField name="old_password" component={FormInput} type="password" label="Старый пароль" required/>
      <FormField name="new_password" component={FormInput} type="password" label="Новый пароль" required/>
      <SubmitBtn submitting={submitting}>Обновить</SubmitBtn>
    </form>
  </div>
);

export default reduxForm({ form: `change-password`, onSubmit })(ChangePassword);
