import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import { includes, map, filter } from 'lodash';

import './checkboxGroup.css';

/**
 * @param {number|string} value
 * @param {number[]|string[]} values
 * @param {function} onChange
 * @return {Function}
 */
const changeHandler = ({ value, values, onChange }) => (e) => {
  const arr = e.target.checked ? [...values, value] : filter(values, (item) => item !== value);

  onChange(arr);
};

const CheckboxGroup = ({ title, data, input }) => (
  <div className="checkbox-group form-group">
    <span className="checkbox-group__title block font-weight-bold">{title}</span>
    {map(data, ({ text, value }) => (
      <label key={value}
             className="checkbox-group__label css-control css-control-success css-switch css-control-sm"
      >
        <span>{text}</span>
        <input type="checkbox"
               className="css-control-input"
               checked={includes(input.value, value)}
               onChange={changeHandler({ value, values: input.value, onChange: input.onChange })}
        />
        <span className="css-control-indicator" />
      </label>
    ))}
  </div>
);

CheckboxGroup.propTypes = {
  ...fieldPropTypes,
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  title: PropTypes.string,
};

export default CheckboxGroup;
