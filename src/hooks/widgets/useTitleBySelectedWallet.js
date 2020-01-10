import React, { useState } from 'react';
import { find, toNumber } from 'lodash';

import useSearchParams from 'hooks/useSearchParams';
import { WidgetType } from 'utils/enums';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import useTable from 'hooks/widgets/useTable';
import { walletActionCreators } from 'actions/widgets/wallet';

/**
 * @param {Object} search
 * @param {string} defaultValue
 * @param {string} prefix
 * @param {Object[]} walletList
 * @return {string|React.ReactNode}
 */
const getTitle = ({ search, defaultValue, prefix, walletList }) => {
  if (search && search.wallet_id) {
    const walletId = toNumber(search.wallet_id);
    const wallet = find(walletList, (item) => item.id === walletId);
    if (wallet) {
      return <span>{prefix}: <b>{wallet.identifier}</b></span>;
    }
  }

  return defaultValue;
};

/**
 * @param {string} defaultValue
 * @param {string} prefix
 * @return {string|React.ReactNode}
 */
const useTitleBySelectedWallet = ({ defaultValue, prefix }) => {
  const { state: { items: walletList } } = useTable({
    widget: WidgetType.WALLETS,
    actionCreators: walletActionCreators,
    loadOnlyIfNecessary: true,
  });

  const search = useSearchParams();

  const [title, setTitle] = useState(getTitle({ defaultValue, prefix, search, walletList }));

  useUpdateEffect(() => {
    setTitle(getTitle({ defaultValue, prefix, search, walletList }));
  }, [search, walletList]);

  return title;
};

export default useTitleBySelectedWallet;
