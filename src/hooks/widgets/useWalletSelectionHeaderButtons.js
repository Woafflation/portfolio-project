import React from 'react';

import useSearchParams from 'hooks/useSearchParams';
import { ModalType } from 'utils/enums';
import { resetWalletSelection } from 'actions/widgets/wallet';

/**
 * @param {function} showModal
 * @param {string} url
 * @param {string} form
 * @return {{onClick: (function(): *), children: (string)}[]}
 */
const useWalletSelectionHeaderButtons = ({ showModal, url, form }) => {
  const search = useSearchParams();

  const headerButtons = [
    {
      children: !search.wallet_id ? `Выбрать кошелек` : `Выбрать другой кошелек`,
      onClick: () => showModal({ type: ModalType.WALLET_SELECTION }),
    },
  ];
  if (search.wallet_id) {
    headerButtons.push({
      children: <i className="fa fa-times text-danger icon-margin-left"/>,
      className: ``,
      onClick: () => resetWalletSelection({ url, form }),
    });
  }

  return headerButtons;
};

export default useWalletSelectionHeaderButtons;
