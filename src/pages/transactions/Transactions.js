import React from 'react';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { filter } from 'lodash';

import { FiltersGridType, ModalType, Permission, WidgetType } from 'utils/enums';
import {
  downloadTransactionCSVListRequest,
  transactionActionCreators,
} from 'actions/widgets/transactions/transactions';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import useWalletSelectionHeaderButtons from 'hooks/widgets/useWalletSelectionHeaderButtons';
import useTitleBySelectedWallet from 'hooks/widgets/useTitleBySelectedWallet';
import useHeaderButtonWithPreloader from 'hooks/widgets/useHeaderButtonWithPreloader';
import { transactionCSVLoadingSelector } from 'selectors/widgets/transaction';
import { hasAccessSelector } from 'selectors/auth';
import transactionTableTitles from 'utils/widgets/transactions/transactionTableTitles';
import transactionListMapping from 'utils/widgets/transactions/transactionListMapping';
import { paymentSystemList } from 'static/payments';
import { transactionFakeStatusList } from 'static/transactions';
import accessibleTransactionTableTitles from 'utils/widgets/transactions/accessibleTransactionTableTitles';

import Filters from 'components/widgets/filters/Filters';
import Widget from 'components/widgets/Widget';
import WalletSelection from 'components/widgets/WalletSelection';
import FakeWalletCreation from 'components/widgets/transaction/FakeWalletCreation';

const { showModal } = transactionActionCreators;

const FORM_NAME = `transaction-filters`;

const FilterForm = reduxForm({
  form: FORM_NAME,
  onSubmit: getSubmitHandler(
    `/transactions`,
    { dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }] },
  ),
})(Filters);

const TRANSACTION_DIRECTIONS = [
  {
    value: null,
    text: ``,
  },
  {
    value: `outgoing`,
    text: `outgoing`,
  },
  {
    value: `ingoing`,
    text: `ingoing`,
  },
];

const leftFilterFields = [
  {
    name: `wallet_type`,
    data: paymentSystemList,
    type: `select`,
    placeholder: `Wallet type`,
  },
  {
    name: `label`,
    placeholder: `Label`,
  },
  {
    name: `direction`,
    data: TRANSACTION_DIRECTIONS,
    type: `select`,
    placeholder: `Direction`,
  },
  {
    name: `transaction_id`,
    placeholder: `Id транзакции`,
  },
  {
    name: `exchanger_identifier`,
    placeholder: `Откуда/куда`,
  },
  {
    name: `fake_flag`,
    data: transactionFakeStatusList,
    type: `select`,
    placeholder: `Фейковый статус`,
  },
];

const rightFilterFields = [
  {
    name: `date_range`,
    type: `date`,
  },
];

const onWalletSelectionSubmit = getSubmitHandler(
  `/transactions`,
  { reduxCallbacks: [transactionActionCreators.hideModal] },
);

const modals = [
  {
    type: ModalType.WALLET_SELECTION,
    title: `Выберите кошелек`,
    children: <WalletSelection onSubmit={onWalletSelectionSubmit}/>,
  },
  {
    type: ModalType.CREATE,
    title: `Генерация транзакции`,
    actionCreators: transactionActionCreators,
    widget: WidgetType.TRANSACTIONS,
    children: <FakeWalletCreation/>,
  },
];

const filterDateFields = [
  {
    from: `date_from`,
    to: `date_to`,
    name: `date_range`,
  },
];

const extraButtons = [
  {
    title: `Сгенерировать транзакцию`,
    onClick: () => showModal({ type: ModalType.CREATE }),
    buttonClassName: `btn-success`,
  },
];

const Transactions = () => {
  const transactionClientAccess = useSelector(hasAccessSelector(Permission.TRANSACTION_CLIENT));
  const transactionListAccess = useSelector(hasAccessSelector(Permission.TRANSACTION));

  const selectWalletButtons = useWalletSelectionHeaderButtons({ showModal, url: `/transactions`, form: FORM_NAME });
  const downloadTransactionsButton = useHeaderButtonWithPreloader({
    buttonProps: {
      children: `Скачать данные`,
      onClick: downloadTransactionCSVListRequest,
    },
    loadingSelector: transactionCSVLoadingSelector,
  });

  const title = useTitleBySelectedWallet({ defaultValue: `Список транзакций`, prefix: `Транзакции кошелька` });

  const accessibleLeftFilterFields = filter(leftFilterFields,
    (item) => transactionClientAccess && !transactionListAccess ? item.name !== `fake_flag` : item);

  const extraHeaderButtons = transactionClientAccess && !transactionListAccess
    ? []
    : [
      ...selectWalletButtons,
      downloadTransactionsButton,
    ];

  const accessibleExtraButton = transactionClientAccess && !transactionListAccess
    ? []
    : extraButtons;

  const accessibleTitles = transactionClientAccess && !transactionListAccess
    ? accessibleTransactionTableTitles
    : transactionTableTitles;

  return (
    <Widget
      actionCreators={transactionActionCreators}
      widget={WidgetType.TRANSACTIONS}
      filterFormName={FORM_NAME}
      pageTitle="Транзакции"
      tableTitle={title}
      tableHeadTitles={accessibleTitles}
      listMapping={transactionListMapping}
      filterForm={
        <FilterForm
          leftFields={accessibleLeftFilterFields}
          rightFields={rightFilterFields}
          formName={FORM_NAME}
          dateFields={filterDateFields}
          gridType={FiltersGridType.GRID}
          numFields={[`fake_flag`]}
        />
      }
      extraHeaderButtons={extraHeaderButtons}
      extraButtons={accessibleExtraButton}
      modals={modals}
      withPagination
      statusBar
    />
  );
};

export default Transactions;
