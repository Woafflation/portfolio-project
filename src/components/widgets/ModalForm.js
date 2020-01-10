import React from 'react';
import { modalFormPropTypes } from 'propTypes/widgets';
import { formPropTypes, getFormValues } from 'redux-form';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ModalFormInput from 'components/form/ModalFormInput';
import ModalFormSubmit from 'components/form/ModalFormSubmit';
import FormField from 'components/form/FormField';

const ModalForm = ({ onSubmit, fields, submitting, submitText, formName, valid, children }) => {
  const values = useSelector(getFormValues(formName));
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(values, dispatch);
  };

  return (
    <form className="add-purse-form js-validation-signin" onSubmit={submitHandler}>
      {map(fields, (field, key) => <FormField key={key} component={ModalFormInput} {...field} />)}
      {children}
      <ModalFormSubmit submitting={submitting} disabled={!valid}>{submitText}</ModalFormSubmit>
    </form>
  );
};

ModalForm.propTypes = {
  ...formPropTypes,
  // Overwriting for disable warnings
  initialize: PropTypes.any,

  ...modalFormPropTypes,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  children: PropTypes.node,
};

export default ModalForm;
