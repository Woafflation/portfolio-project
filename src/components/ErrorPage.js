import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';

const ErrorPage = ({ errorCode, text, title, icon }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="main-content-boxed side-trans-enabled">
        <main className="main-container">
          <div className="hero bg-white">
            <div className="hero-inner">
              <div className="content content-full">
                <div className="py-30 text-center">
                  <div className="display-3 text-danger">
                    <i className={icon}>
                      <h1 className="h1">{errorCode}</h1>
                    </i>
                  </div>
                  <h1 className="h2 font-w700 mt-30 mb-10">{title}</h1>
                  <h2 className="h3 font-w400 text-muted mb-50">{text}</h2>
                  <button
                    type="button"
                    onClick={() => dispatch(goBack())}
                    className="btn btn-hero btn-rounded btn-alt-secondary"
                  >
                    <i className="fa fa-arrow-left mr-10">
                      <span className="h4" />
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

ErrorPage.propTypes = {
  errorCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default ErrorPage;
