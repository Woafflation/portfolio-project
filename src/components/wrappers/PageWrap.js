import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const PageWrap = ({ children }) => (
  <div id="page-container" className={classNames(
    `sidebar-inverse`,
    `side-scroll`,
    `page-header-fixed`,
    `page-header-inverse`,
    `main-content-boxed`,
    `side-trans-enabled`,
  )}>
    {children}
  </div>
);

PageWrap.propTypes = {
  children: PropTypes.node,
};

PageWrap.defaultProps = {
  children: null,
};

export default PageWrap;
