import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useFullAmount from 'hooks/useFullAmount';
import { ModalType, PreliminaryTransactionStatus } from 'utils/enums';
import { preliminaryTransactionsActionCreators } from 'actions/widgets/transactions/preliminaryTransactions';

import InnerTable from 'components/innerTable/InnerTable';

const { showModal } = preliminaryTransactionsActionCreators;

const PreliminaryTransactionRow =
  ({ id, amount, status, created_at, currency_symbol, desktopSize, label, primary_id }) => {
    const dispatch = useDispatch();

    const fullAmount = useFullAmount({ amount, currencySymbol: currency_symbol });

    const statusField = status === PreliminaryTransactionStatus.NEW ?
      (<>
        <span className="badge badge-primary mr-10">Новый</span>
        <button
          type="button"
          onClick={() => dispatch(showModal({ type: ModalType.DELETE_PRELIMINARY_TRANSACTION, id: primary_id }))}
          className="btn btn-sm btn-secondary js-tooltip-enabled"
        >
          <i className="fa fa-trash"/>
        </button>
      </>) :
      (<span className="badge badge-success">Обработанный</span>);

    if (desktopSize) {
      return (
        <tr>
          <td>{id}</td>
          <td>{fullAmount}</td>
          <td>{created_at}</td>
          <td>{label || statusField}</td>
        </tr>
      );
    }

    return (
      <InnerTable cellClassName="mobile-inner-table">
        <tr className="first-mobile-row">
          <td>Номер транзакции</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>Сумма</td>
          <td>{fullAmount}</td>
        </tr>
        <tr>
          <td>Дата создания</td>
          <td>{created_at}</td>
        </tr>
        <tr>
          <td>Статус</td>
          <td>{statusField}</td>
        </tr>
      </InnerTable>
    );
  };

PreliminaryTransactionRow.propTypes = {
  amount: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  currency_symbol: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
};

export default PreliminaryTransactionRow;
