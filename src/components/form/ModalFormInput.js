import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DropdownSelect from 'components/dropdownSelect/DropdownSelect';
import RangeDatepicker from 'components/rangeDatepicker/RangeDatepicker';

const ModalFormInput = ({
  input,
  label,
  type,
  meta: { touched, error, submitFailed },
  data,
  placeholder,
  className,
  fromValue,
  toValue,
  hidden,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (hidden) {
    return null;
  }

  const showError = submitFailed && touched && error;

  let field;
  switch (type) {
    case `select`:
      field = (
        <DropdownSelect
          data={data}
          {...input}
          onChange={value => input.onChange(value.value)}
          placeholder={placeholder}
          {...otherProps}
        />
      );
      break;
    case `date`:
      field = <RangeDatepicker fromValue={fromValue} toValue={toValue} input={input} />;
      break;
    case `textarea`:
      field = (
        <textarea
          rows={3}
          {...input}
          {...otherProps}
          placeholder={placeholder}
          className={classNames(`form-control`, className)}
        />
      );
      break;
    case `password`:
      field = (
        <div className="position-relative">
          <input
            {...input}
            type="text"
            className={classNames(`form-control`, className, { 'password': !showPassword })}
            placeholder={placeholder}
            {...otherProps}
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
          className={classNames(`form-control`, className)}
          placeholder={placeholder}
          {...otherProps}
        />
      );
  }

  return (
    <div className={classNames(`form-group`, `row`, { 'is-invalid': showError })}>
      <label className="col-lg-4 col-form-label">{label}</label>
      <div className="col-lg-8">
        {field}
        {showError && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );
};

ModalFormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,

  fromValue: PropTypes.any,
  toValue: PropTypes.any,

  hidden: PropTypes.bool,
};

ModalFormInput.defaultProps = {
  type: `text`,
  label: ``,
  placeholder: ``,
  data: null,
  className: ``,

  hidden: false,
};

export default ModalFormInput;
