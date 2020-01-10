import React from 'react';
import { concat, isNull, map, toString } from 'lodash';
import { reduxForm } from 'redux-form';
import useMount from 'react-use/lib/useMount';
import PropTypes from 'prop-types';

import useTable from 'hooks/widgets/useTable';
import { WidgetType } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import useSearchParams from 'hooks/useSearchParams';

import ModalForm from 'components/widgets/ModalForm';

const FORM_NAME = `wallet-selection`;

/**
 * @param {Object[]|null} list
 * @return {null|ISelect[]}
 */
const parseWalletList = (list) => {
  if (isNull(list)) {
    return null;
  }

  return concat(
    [{ value: null, text: `` }],
    map(list, ({ id, identifier }) => ({ value: toString(id), text: identifier })),
  );
};

const WalletSelection = ({ initialize, onSubmit, ...props }) => {
  const search = useSearchParams();

  const { state: { items: walletList } } = useTable({
    widget: WidgetType.WALLETS,
    actionCreators: walletActionCreators,
    resetOnUnmount: false,
  });

  useMount(() => {
    if (search.wallet_id) {
      initialize({ wallet_id: search.wallet_id });
    }
  });

  const fields = [
    {
      name: `wallet_id`,
      type: `select`,
      data: parseWalletList(walletList),
      label: `Кошелек`,
    },
  ];

  return <ModalForm {...props} onSubmit={onSubmit} fields={fields} submitText="Выбрать" formName={FORM_NAME} />;
};

WalletSelection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: FORM_NAME })(WalletSelection);