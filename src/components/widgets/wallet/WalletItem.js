import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isNumber, get } from 'lodash';

import { ModalType, Permission, ProxyStatus, WalletStatus, WalletType } from 'utils/enums';
import { getBalance, getTimeFromNow } from 'utils';
import walletLogo from 'utils/walletLogo';
import { markWalletAsActive, walletActionCreators } from 'actions/widgets/wallet';
import { hasAccessSelector } from 'selectors/auth';
import { paytmActionCreators } from 'actions/widgets/wallets/paytm';
import useFullAmount from 'hooks/useFullAmount';

const { hideModal } = walletActionCreators;
const { setAnyData, showModal } = paytmActionCreators;

const WalletRow = ({ children, textClassName, label }) => (
  <tr>
    <td className="font-w600">{label}</td>
    <td className={textClassName}>{children}</td>
  </tr>
);

WalletRow.propTypes = {
  label: PropTypes.string.isRequired,
  textClassName: PropTypes.string,
};

WalletRow.defaultProps = {
  textClassName: `text-muted`,
};

const WalletItem = ({
  id,
  type,
  identifier,
  email_username,
  balance,
  updated_at,
  proxy,
  currency: { symbol },
  username,
  password,
  perfect_money_code,
  api_key,
  security_code,
  merchant_id,
  merchant_account_id,
  account_key,
  status,
  account_password,
  account_name,
  account_number,
  ifsc_code,
  cookie_flag,
  parsing_type,
  secret_key,
  token,
}) => {
  const dispatch = useDispatch();

  const transactionAccess = useSelector(hasAccessSelector(Permission.TRANSACTION));
  const setActiveAccess = useSelector(hasAccessSelector(Permission.WALLET_SET_ACTIVE));

  const fullAmount = useFullAmount({ amount: getBalance(balance, true), currencySymbol: symbol });

  const proxyIp = get(proxy, `ip`);
  const proxyPort = get(proxy, `port`);
  const proxyStatus = get(proxy, `status`);

  const generalFields = (
    <>
      <WalletRow label="ID" textClassName="text-muted">{id}</WalletRow>
      {proxyIp && proxyPort &&
      <WalletRow label="Proxy ip" textClassName="text-muted">
        {proxyIp}:{proxyPort}
        {proxyStatus === ProxyStatus.ERROR &&
        <span className="badge badge-danger icon-margin-left">Прокси не работает</span>
        }
      </WalletRow>
      }
      <WalletRow label="Тип" textClassName="text-muted">
        <img src={walletLogo[type]} alt="" className="wallet_type"/>
      </WalletRow>
      {isNumber(balance) &&
        <WalletRow label="Баланс" textClassName="text-elegance">
          {fullAmount}
        </WalletRow>
      }
      <WalletRow label="Обновление" textClassName="text-success">{getTimeFromNow(updated_at)}</WalletRow>
    </>
  );

  let fields;
  switch (type) {
    case WalletType.PERFECT_MONEY:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Номер" textClassName="text-muted">{identifier}</WalletRow>
          <WalletRow label="Ключ аккаунта" textClassName="text-primary">{perfect_money_code}</WalletRow>
          <WalletRow label="Username" textClassName="text-primary">{username}</WalletRow>
          <WalletRow label="Password" textClassName="text-primary">{password}</WalletRow>
        </>
      );
      break;
    case WalletType.EPAY:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Инедтификатор счёта (email)" textClassName="text-muted">{identifier}</WalletRow>
          <WalletRow label="Api Key" textClassName="text-primary">{api_key}</WalletRow>
        </>
      );
      break;
    case WalletType.HELP_2_PAY:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Merchant Code" textClassName="text-muted">{identifier}</WalletRow>
          <WalletRow label="Security Code" textClassName="text-primary">{security_code}</WalletRow>
        </>
      );
      break;
    case WalletType.CERTUS_FINANCE:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Merchant ID" textClassName="text-primary">{merchant_id}</WalletRow>
          <WalletRow label="Merchant account ID" textClassName="text-primary">{merchant_account_id}</WalletRow>
          <WalletRow label="Key" textClassName="text-primary">{account_key}</WalletRow>
          <WalletRow label="Account username" textClassName="text-muted">{identifier}</WalletRow>
          <WalletRow label="Account password" textClassName="text-primary">{account_password}</WalletRow>
        </>
      );
      break;
    case WalletType.BANK_DIRECT:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Account name" textClassName="text-primary">{account_name}</WalletRow>
          <WalletRow label="Account number" textClassName="text-primary">{account_number}</WalletRow>
          <WalletRow label="IFSC code" textClassName="text-primary">{ifsc_code}</WalletRow>
          <WalletRow label="Identifier" textClassName="text-muted">{identifier}</WalletRow>
        </>
      );
      break;
    case WalletType.UPI:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Account name" textClassName="text-primary">{account_name}</WalletRow>
          <WalletRow label="Identifier" textClassName="text-muted">{identifier}</WalletRow>
        </>
      );
      break;
    case WalletType.DUSUPAY:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Api key" textClassName="text-primary">{api_key}</WalletRow>
          <WalletRow label="Secret key" textClassName="text-muted">{secret_key}</WalletRow>
          <WalletRow label="Token" textClassName="text-muted">{token}</WalletRow>
        </>
      );
      break;
    default:
      fields = (
        <>
          {generalFields}
          <WalletRow label="Номер" textClassName="text-muted">{identifier}</WalletRow>
          <WalletRow label="Почта" textClassName="text-primary">{email_username}</WalletRow>
        </>
      );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-borderless table-vcenter">
        <tbody>
        {fields}
        </tbody>
      </table>
      <div className="modal__control-button">
        {transactionAccess &&
          <Link to={`/transactions?wallet_id=${id}`}
                onClick={() => dispatch(hideModal())}
                className="btn btn-alt-primary"
          >
            Список транзакций
          </Link>
        }
        {setActiveAccess && status !== WalletStatus.OK &&
          <button className="btn btn-alt-success" onClick={() => dispatch(markWalletAsActive(id))}>
            Отметить кошелек рабочим
          </button>
        }
        {type === WalletType.PAY_TM && !cookie_flag && parsing_type === `api` &&
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(setAnyData({ phoneNumber: identifier }));
              dispatch(hideModal());
              dispatch(showModal({ type: ModalType.SMS_CONFIRM }));
            }}
          >
            Ввести sms
          </button>
        }
      </div>
    </div>
  );
};

WalletItem.propTypes = {
  id: PropTypes.number.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  email_username: PropTypes.string,
  password: PropTypes.string,
  username: PropTypes.string,
  status: PropTypes.number.isRequired,
  updated_at: PropTypes.string.isRequired,
  proxy: PropTypes.shape({
    ip: PropTypes.string.isRequired,
    port: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  currency: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
  }).isRequired,
  perfect_money_code: PropTypes.string,
  api_key: PropTypes.string,
  security_code: PropTypes.string,
  merchant_id: PropTypes.string,
  merchant_account_id: PropTypes.string,
  account_key: PropTypes.string,
  account_password: PropTypes.string,
  account_name: PropTypes.string,
  account_number: PropTypes.string,
  ifsc_code: PropTypes.string,
  cookie_flag: PropTypes.number,
  parsing_type: PropTypes.string,
  secret_key: PropTypes.string,
  token: PropTypes.string,
};

export default WalletItem;
