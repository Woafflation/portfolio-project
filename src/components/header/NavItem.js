import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItem = ({ title, path, className }) => (
  <li>
    <Link to={path}><i className={className}/>{title}</Link>
  </li>
);

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default NavItem;
