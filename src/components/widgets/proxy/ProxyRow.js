import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Permission, ProxyStatus } from 'utils/enums';
import { hasAccessSelector } from 'selectors/auth';

import InnerTable from 'components/innerTable/InnerTable';

const Control = ({ status, onCheck, onUpdate, onRemove, checkClicked }) => {
  const dispatch = useDispatch();

  const checkProxyAccess = useSelector(hasAccessSelector(Permission.PROXY_CHECK));
  const deleteProxyAccess = useSelector(hasAccessSelector(Permission.PROXY_DELETE));
  const updateProxyAccess = useSelector(hasAccessSelector(Permission.PROXY_UPDATE));

  const checkIconClassName = classNames(
    {
      'si si-like': checkClicked && status === ProxyStatus.SUCCESS,
      'fa fa-sun-o fa-spin': status === ProxyStatus.CHECKING,
      'si si-dislike': checkClicked && status === ProxyStatus.ERROR,
      'fa fa-eye': !checkClicked,
    }
  );

  return (
    <div className="btn-group">
      {checkProxyAccess &&
        <button type="button"
                className={classNames(
                  `btn`, `btn-sm`, `js-tooltip-enabled`,
                  {
                    'btn-success': checkClicked && status === ProxyStatus.SUCCESS,
                    'btn-danger': checkClicked && status === ProxyStatus.ERROR,
                    'btn-secondary': !checkClicked || status === ProxyStatus.CHECKING,
                  }
                )}
                title="Check"
                onClick={onCheck}
        >
          <i className={checkIconClassName}/>
        </button>
      }
      {updateProxyAccess &&
        <button type="button"
                className="btn btn-sm btn-secondary js-tooltip-enabled"
                onClick={() => dispatch(onUpdate())}
        >
          <i className="fa fa-pencil"/>
        </button>
      }
      {deleteProxyAccess &&
        <button type="button"
                className="btn btn-sm btn-secondary js-tooltip-enabled"
                onClick={() => dispatch(onRemove())}
        >
          <i className="fa fa-trash"/>
        </button>
      }
    </div>
  );
};

Control.propTypes = {
  status: PropTypes.number.isRequired,
  checkClicked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const ProxyRow = ({ ip, port, status, onCheck, desktopSize, type, ...controls }) => {
  const dispatch = useDispatch();

  const [checkClicked, setCheckClicked] = useState(false);

  const checkChangeHandler = () => {
    setCheckClicked(true);
    dispatch(onCheck());
  };

  const displayProxy = `${ip}:${port}`;

  const displayErrorStatus = <span className="badge badge-danger text-overflow">Не работает</span>;

  return (
    desktopSize ?

      <tr>
        <td>{displayProxy}</td>
        <td>{type}</td>
        <td>
          {!checkClicked && status === ProxyStatus.ERROR && displayErrorStatus}
        </td>
        <td>
          <Control {...controls} status={status} onCheck={checkChangeHandler} checkClicked={checkClicked}/>
        </td>
      </tr> :

      <InnerTable cellClassName="mobile-inner-table">
        <tr className="first-mobile-row">
          <td>IP:Port</td>
          <td>{displayProxy}</td>
        </tr>
        <tr className="first-mobile-row">
          <td>Тип</td>
          <td>{type}</td>
        </tr>
        {!checkClicked && status === ProxyStatus.ERROR &&
        <tr>
          <td>Статус</td>
          <td>{displayErrorStatus}</td>
        </tr>
        }
        <tr>
          <td>Действия</td>
          <td>
            <Control {...controls}
                     status={status}
                     onCheck={checkChangeHandler}
                     checkClicked={checkClicked}
            />
          </td>
        </tr>
      </InnerTable>
  );
};

ProxyRow.propTypes = {
  ip: PropTypes.string.isRequired,
  port: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  status: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ProxyRow;
