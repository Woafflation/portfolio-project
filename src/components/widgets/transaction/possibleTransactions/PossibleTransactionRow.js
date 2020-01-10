import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { split } from 'lodash';

import walletLogo from 'utils/walletLogo';
import { ModalType, PreliminaryTransactionStatus } from 'utils/enums';
import {
  possibleTransactionActionCreators,
} from 'actions/widgets/transactions/possibleTransactions';

import InnerTable from 'components/innerTable/InnerTable';

const { showModal: showManagementModal } = possibleTransactionActionCreators;

const PossibleTransactionRow = ({
  id,
  primary_id,
  wallet_type,
  created_at,
  desktopSize,
  status,
}) => {
  const dispatch = useDispatch();

  const statusField = status === PreliminaryTransactionStatus.NEW ?
    (<span className="badge badge-primary">Новый</span>) :
    (<span className="badge badge-success">Обработанный</span>);

  const [displayCreatedAt] = split(created_at);

  const walletTypeImage = <img src={walletLogo[wallet_type]} alt="" className="wallet_type"/>;

  const controls = (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-sm btn-secondary js-tooltip-enabled"
        onClick={() => dispatch(showManagementModal({ type: ModalType.UPDATE, id: primary_id }))}
      >
        <i className="fa fa-eye"/>
      </button>
    </div>
  );

  return (
    desktopSize ?

      <tr>
        <td>{walletTypeImage}</td>
        <td>{id}</td>
        <td>{displayCreatedAt}</td>
        <td>{controls}</td>
        <td>{statusField}</td>
      </tr> :

      <InnerTable cellClassName="mobile-inner-table">
        <tr className="first-mobile-row">
          <td>Тип</td>
          <td>{walletTypeImage}</td>
        </tr>
        <tr>
          <td>Номер транзакции</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>Дата</td>
          <td>{displayCreatedAt}</td>
        </tr>
        <tr>
          <td>Действия</td>
          <td>{controls}</td>
        </tr>
        <tr>
          <td>Статус</td>
          <td>{statusField}</td>
        </tr>
      </InnerTable>
  );
};

PossibleTransactionRow.propTypes = {
  id: PropTypes.string.isRequired,
  wallet_type: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
  status: PropTypes.number.isRequired,
};

export default PossibleTransactionRow;
