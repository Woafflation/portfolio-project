import React from 'react';
import PropTypes from 'prop-types';

import logo from 'assets/media/logo.svg';

const AuthContainerWrap = ({ children }) => (
  <div id="page-container" className="main-content-boxed">

    <main id="main-container" className="main-container">

      <div className="bg-body-dark bg-pattern auth-wrap-bg">
        <div className="row mx-0 justify-content-center">
          <div className="hero-static col-lg-6 col-xl-4">
            <div className="content content-full overflow-hidden">
              <div className="py-30 text-center">
                <div className="link-effect font-w700 mr-5">
                  <img src={logo} alt=""/>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

AuthContainerWrap.propTypes = {
  children: PropTypes.node,
};

AuthContainerWrap.defaultProps = {
  children: null,
};

export default AuthContainerWrap;
