import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useFullAmount from 'hooks/useFullAmount';
import { PostbackSendStatus } from 'utils/enums';

const StockpilingRow = ({
  id,
  label,
  amount,
  currency_symbol,
  updated_at,
  postback_send,
  onShowClick,
}) => {
  const fullAmount = useFullAmount({ amount, currencySymbol: currency_symbol });
  const dispatch = useDispatch();

  const isPostbackSend = postback_send === PostbackSendStatus.SEND ? <i className="fa fa-check"/> : null;

  return (
    <tr>
      <th>{id}</th>
      <td>
        <div className="text-elegance"><strong>{fullAmount}</strong></div>
      </td>
      <td>{label}</td>
      <td>{updated_at}</td>
      <td>{isPostbackSend}</td>
      <td>
        <button className="btn btn-sm btn-secondary" onClick={() => dispatch(onShowClick())}>
          Отправленные постбеки
        </button>
      </td>
    </tr>
  );
};

StockpilingRow.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  currency_symbol: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  postback_send: PropTypes.number.isRequired,
};

export default StockpilingRow;
