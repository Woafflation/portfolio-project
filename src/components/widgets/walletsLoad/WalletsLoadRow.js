import React from 'react';
import { isNumber } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useFullAmount from 'hooks/useFullAmount';
import { splitNumBySpaces } from 'utils';
import walletLogo from 'utils/walletLogo';

import InnerTable from 'components/innerTable/InnerTable';

const WalletsLoadRow = ({
  id,
  wallet_type,
  identifier,
  transactions_count,
  transactions_sum,
  desktopSize,
  onWalletClick,
  currency_symbol,
  dataTitle,
}) => {
  const dispatch = useDispatch();
  const fullAmount = useFullAmount({
    amount: splitNumBySpaces(transactions_sum, { splitFloatNumbers: true }),
    currencySymbol: currency_symbol,
  });

  const data = isNumber(transactions_count) ?
    transactions_count.toLocaleString(`ru`) :
    fullAmount;

  const walletIdentifier = onWalletClick ?
    <button className="button-link" onClick={() => dispatch(onWalletClick())}>{identifier}</button> :
    identifier;

  const walletTypeImage = <img src={walletLogo[wallet_type]} alt="" className="wallet_type"/>;

  return (
    desktopSize ?
      <tr>
        <td className="text-center">{id}</td>
        <td>{walletTypeImage}</td>
        <td>{walletIdentifier}</td>
        <td>{data}</td>
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
          <td>Кошелек</td>
          <td>{identifier}</td>
        </tr>
        <tr>
          <td>{dataTitle}</td>
          <td>{data}</td>
        </tr>
      </InnerTable>
  );
};

WalletsLoadRow.propTypes = {
  id: PropTypes.number.isRequired,
  identifier: PropTypes.string.isRequired,
  wallet_type: PropTypes.string.isRequired,
  desktopSize: PropTypes.bool.isRequired,
  currency_symbol: PropTypes.string,
  dataTitle: PropTypes.string,
};

export default WalletsLoadRow;
