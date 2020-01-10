import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, isNumber } from 'lodash';

import useFullAmount from 'hooks/useFullAmount';
import { Permission, ProxyStatus, WalletError, WalletStatus, WalletType } from 'utils/enums';
import { getBalance, getTimeFromNow } from 'utils';
import walletLogo from 'utils/walletLogo';
import { hasAccessSelector } from 'selectors/auth';
import useRouteName from 'hooks/useRouteName';

import InnerTable from 'components/innerTable/InnerTable';

const getWalletError = (error) => {
  switch (error) {
    case WalletError.PROXY_CONNECT:
      return `Нерабочий прокси`;
    case WalletError.EMAIL_AUTH:
      return `Не смогли авторизоваться в почте кошелька`;
    case WalletError.ACCOUNT_AUTH:
      return `Не смогли авторизоваться в приложении кошелька`;
    case WalletError.TRANSACTION_PARSING:
      return `Ошибка при парсинге транзакции`;
    default:
      return `Неизвестная ошибка`;
  }
};

const controlPropTypes = {
  onShowClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

const Control = ({ onShowClick, onEditClick, onRemoveClick, desktopSize, id }) => {
  const dispatch = useDispatch();

  const removeAccess = useSelector(hasAccessSelector(Permission.WALLET_DELETE));
  const updateAccess = useSelector(hasAccessSelector(Permission.WALLET_UPDATE));

  const route = useRouteName();

  return (
    <div className="btn-group">
      {desktopSize &&
      <button type="button"
              className="btn btn-sm btn-secondary js-tooltip-enabled"
              onClick={() => dispatch(onShowClick())}>
        <i className="fa fa-eye"/>
      </button>
      }
      <Link to={`/logs?wallet_id=${id}`} className="btn btn-sm btn-secondary js-tooltip-enabled">
        <i className="fa fa-list"/>
      </Link>
      {updateAccess &&
      <button type="button"
              className="btn btn-sm btn-secondary js-tooltip-enabled"
              onClick={() => dispatch(onEditClick())}
      >
        <i className="fa fa-pencil"/>
      </button>
      }
      {removeAccess && route !== `/disabled-wallets` && <button type="button"
               className="btn btn-sm btn-secondary js-tooltip-enabled"
               onClick={() => dispatch(onRemoveClick())}>
        <i className="fa fa-trash"/>
      </button>}
    </div>
  );
};

Control.propTypes = {
  ...controlPropTypes,
  desktopSize: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

const WalletRow = ({
  id,
  type,
  identifier,
  balance,
  email_username,
  status,
  currency,
  proxy,
  error,
  updated_at,
  desktopSize,
  username,
  password,
  code,
  cookie_flag,
  parsing_type,
  ...controls
}) => {
  const fullAmount = useFullAmount({
    amount: getBalance(balance, true),
    currencySymbol: get(currency, `symbol`),
  });

  const proxyStatus = get(proxy, `status`);
  const walletTypeImage = <img src={walletLogo[type]} alt="" className="wallet_type"/>;

  const balanceView = isNumber(balance) ? (
    <div className="text-elegance">
      <strong>{fullAmount}</strong>
    </div>
  ) : null;

  const showError = getWalletError(error);

  const walletDoesNotWork = (
    <span className="badge badge-danger text-overflow d-block" title={showError}>{showError}</span>
  );

  const proxyDoesNotWork = <span className="badge badge-danger text-overflow d-block">Прокси не работает</span>;

  const needToUpdateCookies =
    type === WalletType.PAY_TM &&
    !cookie_flag &&
    parsing_type === `api` &&
    <span className="badge badge-warning text-overflow d-block">Обновите куки</span>;

  return (
    desktopSize ?

      <tr>
        <th className="text-center" scope="row">{id}</th>
        <td>{walletTypeImage}</td>
        <td>{identifier}</td>
        <td className="text-primary">{email_username}</td>
        <td>{balanceView}</td>
        <td>
          {proxyStatus === ProxyStatus.ERROR ? proxyDoesNotWork : status === WalletStatus.ERROR && walletDoesNotWork}
          {needToUpdateCookies}
        </td>
        <td>
          <Control {...controls} id={id} desktopSize={desktopSize}/>
        </td>
      </tr> :

      <InnerTable cellClassName="mobile-inner-table">
        <tr className="first-mobile-row">
          <td>ID</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>Тип</td>
          <td>{walletTypeImage}</td>
        </tr>
        <tr>
          <td>Номер</td>
          <td>{identifier}</td>
        </tr>
        <tr>
          <td>Proxy</td>
          <td>{get(proxy, `ip`)}:{get(proxy, `port`)}</td>
        </tr>
        {type !== WalletType.PERFECT_MONEY &&
        <tr>
          <td>Почта</td>
          <td className="text-primary">{email_username}</td>
        </tr>
        }
        {type === WalletType.PERFECT_MONEY &&
        <>
          <tr>
            <td>Ключ аккаунта</td>
            <td className="text-primary">{code}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td className="text-primary">{username}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td className="text-primary">{password}</td>
          </tr>
        </>

        }
        <tr>
          <td>Баланс</td>
          <td>{balanceView}</td>
        </tr>
        {type === WalletType.EPAY &&
        <tr>
          <td>Code</td>
          <td>{code}</td>
        </tr>
        }
        {proxyStatus === ProxyStatus.ERROR &&
        <tr>
          <td>Статус</td>
          <td>{proxyDoesNotWork}</td>
        </tr>
        }
        {status !== WalletStatus.OK &&
        <tr>
          <td>Статус</td>
          <td>{walletDoesNotWork}</td>
        </tr>
        }
        <tr>
          <td>Обновление</td>
          <td className="text-success">{getTimeFromNow(updated_at)}</td>
        </tr>
        <tr>
          <td>Действия</td>
          <td>
            <Control {...controls} id={id} desktopSize={desktopSize}/>
          </td>
        </tr>
      </InnerTable>
  );
};

WalletRow.propTypes = {
  ...controlPropTypes,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  email_username: PropTypes.string,
  status: PropTypes.number.isRequired,
  error: PropTypes.string,
  currency: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
  }).isRequired,
  proxy: PropTypes.shape({
    ip: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    port: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  password: PropTypes.string,
  username: PropTypes.string,
  updated_at: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
  code: PropTypes.string,
  cookie_flag: PropTypes.number,
  parsing_type: PropTypes.string,
};

export default WalletRow;
