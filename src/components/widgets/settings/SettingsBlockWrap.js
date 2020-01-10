import React from 'react';
import PropTypes from 'prop-types';

const SettingsBlockWrap = ({ title, children }) =>(
  <div className="block-content">
    <h3 className="content-heading pt-0">{title}</h3>
    <div className="row">
      {children}
    </div>
  </div>
);

SettingsBlockWrap.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

SettingsBlockWrap.defaultProps = {
  children: null,
};

export default SettingsBlockWrap;
