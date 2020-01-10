import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import walletLogo from 'utils/walletLogo';
import { walletActionCreators } from 'actions/widgets/wallet';
import { logActionCreators } from 'actions/widgets/log';
import { ModalType } from 'utils/enums';

const LogRow = ({
  error_type,
  message,
  created_at,
  wallet_id,
  wallet_type,
  wallet_identifier,
}) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td><img src={walletLogo[wallet_type]} alt="" className="wallet_type"/></td>
      <td>
        <button className="button-link"
                onClick={() => dispatch(walletActionCreators.showModal({ type: ModalType.SHOW, id: wallet_id }))}
        >
          {wallet_identifier}
        </button>
      </td>
      <td><span className="text-danger">{error_type}</span></td>
      <td>
        <button className="button-link"
                onClick={() => dispatch(logActionCreators.showModal({ type: ModalType.LOG_MESSAGE, message }))}
        >
          {message.substr(0, 255)}
        </button>
      </td>
      <td className="logs__cell--date">{created_at}</td>
    </tr>
  );
};

LogRow.propTypes = {
  error_type: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  wallet_id: PropTypes.number.isRequired,
  wallet_type: PropTypes.string.isRequired,
  wallet_identifier: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default LogRow;
