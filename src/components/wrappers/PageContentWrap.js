import React from 'react';
import PropTypes from 'prop-types';

const PageContentWrap = ({ children, title }) => (
  <main id="main-container" className="main-container">
    <div className="content content-full">
      <h2 className="content-heading">{title}</h2>
      {children}
    </div>
  </main>
);

PageContentWrap.propTypes = {
  title: PropTypes.string,
};

PageContentWrap.defaultProps = {
  title: ``,
};

export default PageContentWrap;
