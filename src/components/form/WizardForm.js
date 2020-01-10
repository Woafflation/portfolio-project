import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';

const WizardForm = ({ tabs, activePage, children, setPage, formName, submitText }) => {
  const [progressBarStyle, setProgressBarStyle] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setProgressBarStyle({ width: `${activePage / size(tabs) * 100}%` });
  }, [activePage]);

  const firstPage = activePage === 1;

  const lastPage = activePage === size(tabs);

  return (
    <div className="js-wizard-simple block">
      <ul className="nav nav-tabs nav-tabs-block nav-fill">
        {map(tabs, ({ title, page }) => (
          <li className="nav-item" key={page}>
            <button type="button"
                    className={classNames(
                      `nav-link`,
                      `full-width`,
                      { 'active': page === activePage }
                    )}
                    onClick={() => setPage(page)}
            >
              {page}. {title}
            </button>
          </li>
        ))}
      </ul>
      <div className="block-content block-content-sm">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
               style={progressBarStyle}
          >

          </div>
        </div>
      </div>
      <div className="block-content block-content-full tab-content">
        {children}
      </div>
      <div className="block-content block-content-sm block-content-full bg-body-light">
        <div className="row">
          <div className="col-6">
            <button className={classNames(`btn`, `btn-alt-secondary`, { 'disabled': firstPage })}
                    type="button"
                    disabled={firstPage}
                    onClick={() => setPage(activePage - 1)}
            >
              <i className="fa fa-angle-left mr-5"/>
              Назад
            </button>
          </div>
          <div className="col-6 text-right">
            <button className={classNames(`btn`, {
              'btn-alt-secondary': !lastPage,
              'btn-alt-primary': lastPage,
            })}
                    type="button"
                    onClick={() => lastPage ? dispatch(submit(formName)) : setPage(activePage + 1)}
            >
              {!lastPage && <i className="fa fa-angle-right mr-5"/>}
              {lastPage ? submitText : `Вперед`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

WizardForm.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    page: PropTypes.number,
  })).isRequired,
  activePage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  setPage: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default WizardForm;
