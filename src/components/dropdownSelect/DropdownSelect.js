import React from 'react';
import { DropdownList } from 'react-widgets';
import './style.css';
import { size } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FILTER_FROM_SIZE = 10;

const DropdownSelect = ({ data, className, ...props }) => (
  <DropdownList {...props}
                data={data || []}
                filter={size(data) > FILTER_FROM_SIZE}
                valueField="value"
                textField="text"
                containerClassName={classNames(`form-control`, className)}
  />
);

DropdownSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  className: PropTypes.string,
};

DropdownSelect.defaultProps = {
  data: [],
  className: ``,
};

export default DropdownSelect;
