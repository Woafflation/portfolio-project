import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isNull, map, isString } from 'lodash';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import useSearchParams from 'hooks/useSearchParams';
import useDesktopSize from 'hooks/useDesktopSize';
import { tableHeaderExtraButtons } from 'propTypes/widgets';

import './tableContentWrap.css';

const TableContentWrap = ({ children, title, onRefresh, extraHeaderButtons, loading, withFilters }) => {
  const dispatch = useDispatch();

  const [refreshedOnce, setRefreshedOnce] = useState(false);

  const desktopSize = useDesktopSize();

  const search = useSearchParams();

  const onRefreshHandler = () => {
    if (withFilters) {
      dispatch(onRefresh({ payload: search }));
    } else {
      dispatch(onRefresh());
    }
    if (!refreshedOnce) {
      setRefreshedOnce(true);
    }
  };

  return (
    <div className="purses-list-block block">
      <div className="block-header block-header-default">
        <div className="table-content__left">
          <h3 className="table-content__title">{title}</h3>
          {extraHeaderButtons &&
            map(extraHeaderButtons, ({
              children,
              onClick,
              className,
              withDispatch = true,
            }, i) => {
              const clickHandler = withDispatch ? () => dispatch(onClick()) : onClick;

              if (!isString(className)) {
                className = classNames(`btn`, `btn-alt-primary`, { 'ml-20': i !== 0 });
              }

              return (
                <button key={i} onClick={clickHandler} className={className}>{children}</button>
              );
            })
          }
        </div>
        {!isNull(onRefresh) &&
        <button type="button" onClick={onRefreshHandler} className="btn btn-alt-success table-header-btn">
          <i className={classNames(`si`, `si-refresh`, { 'update-btn-rotate': refreshedOnce && loading })}/>
        </button>
        }
      </div>
      <div className={classNames(`block-content`, `table-content__content`, { 'no-padding': !desktopSize })}>
        {children}
      </div>
    </div>
  );
};

TableContentWrap.propTypes = {
  ...tableHeaderExtraButtons,

  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onRefresh: PropTypes.func,
  children: PropTypes.node,
  loading: PropTypes.bool,
  withFilters: PropTypes.bool,
};

TableContentWrap.defaultProps = {
  extraHeaderButtons: [],

  title: ``,
  onRefresh: null,
  children: null,

  loading: false,
  withFilters: false,
};

export default TableContentWrap;
