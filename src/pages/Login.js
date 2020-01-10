import React from 'react';
import { reduxForm } from 'redux-form';

import { loginRequest } from 'actions/auth';
import { LOGIN_FORM_NAME } from 'utils/constants';

import FormInput from 'components/form/FormInput';
import AuthContainerWrap from 'components/wrappers/AuthContainerWrap';
import FormField from 'components/form/FormField';

/**
 * @param {LoginFormData} values
 * @param {function} dispatch
 */
const onSubmit = (values, dispatch) => {
  dispatch(loginRequest(values));
};

const Form = ({ handleSubmit, submitting, error }) => (
  <AuthContainerWrap>
    <form className="sign-account-form js-validation-signin" onSubmit={handleSubmit}>
      <div className="block block-themed block-rounded block-shadow">
        <div className="block-content">
          <FormField type="text" component={FormInput} label="Логин" name="name" required />
          <FormField name="password" component={FormInput} label="Пароль" autocompletePassword password required />
          {error && <span className="text-danger">{error}</span>}
          <div className="form-group row mb-0">
            <div className="col-sm-6 d-sm-flex align-items-center push" />
            <div className="col-sm-6 text-sm-right push">
              <button type="submit" className="btn btn-alt-primary" disabled={submitting}>
                <i className="si si-login mr-10"/> Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </AuthContainerWrap>
);

export default reduxForm({ form: LOGIN_FORM_NAME, onSubmit })(Form);
