import React from 'react';

import useRouteName from 'hooks/useRouteName';
import useUserHasAccess from 'hooks/useUserHasAccess';

import WalletRow from 'components/widgets/wallet/WalletRow';
import WalletUpdateForm from 'components/widgets/wallet/WalletUpdatingForm';
import Widget from 'components/widgets/Widget';
import { ModalType, WidgetType } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';

import 'pages/wallets/wallets.css';

const { showModal, remove } = walletActionCreators;

const tableHeadTitles = [
  {
    title: `ID`,
    className: `wallet-list__th--id`,
  },
  {
    title: `Тип`,
  },
  {
    title: `Номер`,
  },
  {
    title: `Почта`,
  },
  {
    title: `Баланс`,
  },
  {
    title: ``,
  },
  {
    title: `Действия`,
  },
];

const listMapping = (item) => (
  <WalletRow
    key={item.id}
    {...item}
    onShowClick={() => showModal({ id: item.id, type: ModalType.SHOW })}
    onEditClick={() => showModal({ id: item.id, type: ModalType.UPDATE })}
    onRemoveClick={() => remove(item.id)}
  />
);

const modals = [
  {
    type: ModalType.UPDATE,
    title: `Редактировать кошелек`,
    children: <WalletUpdateForm />,
  },
];

const Wallets = () => {
  useUserHasAccess();
  const route = useRouteName();

  const tableTitle = route === `/disabled-wallets` ? `Список отключенных кошельков` : `Список кошельков`;

  return (
    <Widget
      widget={WidgetType.WALLETS}
      actionCreators={walletActionCreators}
      pageTitle="Мои кошельки"
      tableTitle={tableTitle}
      tableHeadTitles={tableHeadTitles}
      listMapping={listMapping}
      modals={modals}
      statusBar
    />
  );
};

export default Wallets;
