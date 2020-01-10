import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DropdownSelect from 'components/dropdownSelect/DropdownSelect';

const FormInput = ({
  input,
  type,
  label,
  meta: { error, touched, submitFailed },
  data,
  placeholder,
  half,
  marginRight,
  autocompletePassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const showError = submitFailed && touched && error;
  if (type === `checkbox`) {
    return (
      <div className="form-group">
        <label className="css-control css-control-success css-switch css-control-sm">
          <input type="checkbox" className="css-control-input" {...input}/>
          <span className="css-control-indicator mr-5" />
          {label}
        </label>
      </div>
    );
  }

  let field;
  switch (type) {
    case `select`:
      field = (
        <DropdownSelect
          data={data}
          {...props}
          {...input}
          onChange={value => input.onChange(value.value)}
          placeholder={placeholder}
        />
      );
      break;
    case `textarea`:
      field = (
        <textarea rows={3} {...input} {...props} id={input.name} placeholder={placeholder} className="form-control" />
      );
      break;
    case `password`:
      field = (
        <div className="position-relative">
          <input
            {...input}
            type={autocompletePassword && !showPassword ? `password` : `text`}
            className={classNames(`form-control`, { 'password': !showPassword })}
            placeholder={placeholder}
            {...props}
          />
          <button
            className="password-eye-btn"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            title={showPassword ? `Скрыть пароль` : `Показать пароль`}
          >
            <i className="si si-eye" />
          </button>
        </div>
      );
      break;
    default:
      field = (
        <input
          {...input}
          type={type}
          className="form-control"
          id={input.name}
          autoComplete="off"
          placeholder={placeholder}
          {...props}
        />
      );
  }

  return (
    <div className={classNames(
      `form-group`,
      {
        'is-invalid': showError,
        'w-50': half,
        'margin-right': marginRight,
      })}>
      {label && <label htmlFor={input.name}>{label}</label>}
      {field}
      {showError && <span className="text-danger">{error}</span>}
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  placeholder: PropTypes.string,
  half: PropTypes.bool,
  marginRight: PropTypes.bool,
  autocompletePassword: PropTypes.bool,
};

FormInput.defaultProps = {
  type: `text`,
  label: null,
  data: null,
  placeholder: ``,
  half: false,
  marginRight: false,
  autocompletePassword: false,
};

export default FormInput;
