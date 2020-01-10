import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { assign, toString } from 'lodash';

import validateMessages from 'utils/validateMessages';
import { FieldType } from 'utils/enums';

import CheckboxGroup from 'components/form/checkboxGroup/CheckboxGroup';

/**
 * @param {boolean} required
 * @param {boolean} email
 * @return {function[]}
 */
const getValidates = ({ required, email }) => {
  const validates = [];

  if (required) {
    validates.push(value => {
      value = toString(value);

      return !value ? validateMessages.requiredField : undefined;
    });
  }

  if (email) {
    validates.push((value) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return validateMessages.invalidEmail;
      }

      return undefined;
    });
  }

  return validates;
};

const FormField = ({ required, password, email, fieldType, ...props }) => {
  const [validates, setValidates] = useState([]);

  useEffect(() => {
    setValidates(getValidates({ required, email }));
  }, [required, email]);

  if (fieldType === FieldType.CHECKBOX_GROUP) {
    return <Field {...props} component={CheckboxGroup} />;
  }

  const extraProps = {};
  if (password) {
    assign(extraProps, { type: `password` });
  }

  return <Field {...props} {...extraProps} validate={validates} />;
};

FormField.propTypes = {
  required: PropTypes.bool,
  password: PropTypes.bool,
  email: PropTypes.bool,

  fieldType: PropTypes.number,
};

FormField.defaultProps = {
  required: false,
  password: false,
  email: false,

  fieldType: FieldType.INPUT,
};

export default FormField;
