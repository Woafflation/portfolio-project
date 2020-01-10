import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { split, find, get } from 'lodash';

import useFullAmount from 'hooks/useFullAmount';
import walletLogo from 'utils/walletLogo';
import { ModalType, Permission, TransactionStatus } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import { hasAccessSelector } from 'selectors/auth';
import { transactionStatusList } from 'static/transactions';

import InnerTable from 'components/innerTable/InnerTable';

const Direction = {
  OUTGOING: `outgoing`,
  INGOING: `ingoing`,
};

const statusParams = {
  [TransactionStatus.ACTIVATED]: {
    message: `Активирована`,
    color: `badge-success`,
  },
  [TransactionStatus.NOT_ACTIVATED]: {
    message: `Неактивирована`,
    color: `badge-warning`,
  },
  [TransactionStatus.REFUSED]: {
    message: `Отклонена`,
    color: `badge-danger`,
  },
  [TransactionStatus.PENDING]: {
    message: `В ожидании`,
    color: `badge-primary`,
  },
  [TransactionStatus.IN_PROCESSING]: {
    message: `В обработке`,
    color: `badge-primary`,
  },
  [TransactionStatus.CRASHED]: {
    message: `Сбой`,
    color: `badge-danger`,
  },
  [TransactionStatus.CANCELED]: {
    message: `Отменена`,
    color: `badge-danger`,
  },
};

const TransactionRow = ({
  id,
  wallet_type,
  wallet_identifier,
  amount,
  currency_symbol,
  status,
  direction,
  created_at,
  desktopSize,
  wallet_id,
  exchanger_identifier,
  transaction_label,
  label,
  fake_flag,
}) => {
  const dispatch = useDispatch();

  const fullAmount = useFullAmount({ amount, currencySymbol: currency_symbol });

  const transactionClientAccess = useSelector(hasAccessSelector(Permission.TRANSACTION_CLIENT));
  const transactionListAccess = useSelector(hasAccessSelector(Permission.TRANSACTION));

  const directionColors = {
    'text-danger': direction === Direction.OUTGOING,
    'text-success': direction === Direction.INGOING,
  };

  const [displayCreatedAt] = split(created_at);

  const walletIdentifier = (
    <button
      className="button-link"
      onClick={() => dispatch(walletActionCreators.showModal({ id: wallet_id, type: ModalType.SHOW }))}
    >
      {wallet_identifier}
    </button>
  );

  const walletTypeImage = <img src={walletLogo[wallet_type]} alt="" className="wallet_type"/>;

  const transactionSum = <strong>{direction === Direction.INGOING ? `+ ${fullAmount}` : `- ${fullAmount}`}</strong>;

  const successLabel = <span className="badge badge-success">{transaction_label || label}</span>;

  const statusField = (
    <span className={`badge ${get(statusParams, `[${status}].color`)}`}>
      {get(statusParams, `[${status}].message`)}
    </span>
  );

  if (desktopSize) {
    return (
      <tr>
        <td>{walletTypeImage}</td>
        {transactionClientAccess && !transactionListAccess ? null : <td>{walletIdentifier}</td>}
        <td className={classNames(directionColors)}>{transactionSum}</td>
        <td>{id}</td>
        <td>{exchanger_identifier}</td>
        <td>{displayCreatedAt}</td>
        <td>{status === TransactionStatus.ACTIVATED && successLabel}</td>
        <td>{statusField}</td>
        {transactionClientAccess && !transactionListAccess
          ? null
          : <td>{fake_flag ? <span className="badge badge-warning">Фейк</span> : null}</td>
        }
      </tr>
    );
  }

  return (
    <InnerTable cellClassName="mobile-inner-table">
      <tr className="first-mobile-row">
        <td>Тип</td>
        <td>{walletTypeImage}</td>
      </tr>
      {transactionClientAccess && !transactionListAccess
        ? null
        : <tr>
            <td>Номер кошелька</td>
            <td>{walletIdentifier}</td>
          </tr>}
      <tr>
        <td>Сумма транзакции</td>
        <td className={classNames(directionColors)}>{transactionSum}</td>
      </tr>
      <tr>
        <td>Номер транзакции</td>
        <td>{id}</td>
      </tr>
      <tr>
        <td>{direction === Direction.INGOING ? `Откуда` : `Куда`}
        </td>
        <td>{exchanger_identifier}</td>
      </tr>
      <tr>
        <td>Дата</td>
        <td>{displayCreatedAt}</td>
      </tr>
      {status === TransactionStatus.ACTIVATED &&
      <tr>
        <td>Label</td>
        <td>{successLabel}</td>
      </tr>
      }
      <tr>
        <td>Статус</td>
        <td>{statusField}</td>
      </tr>
    </InnerTable>
  );
};

TransactionRow.propTypes = {
  id: PropTypes.string.isRequired,
  wallet_type: PropTypes.string.isRequired,
  wallet_identifier: PropTypes.string.isRequired,
  wallet_id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  currency_symbol: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
  transaction_label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fake_flag: PropTypes.number,
};

export default TransactionRow;
