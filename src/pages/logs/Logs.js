import React from 'react';
import { reduxForm } from 'redux-form';

import useWalletSelectionHeaderButtons from 'hooks/widgets/useWalletSelectionHeaderButtons';
import { logActionCreators } from 'actions/widgets/log';
import { ModalType, WidgetType } from 'utils/enums';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import useTitleBySelectedWallet from 'hooks/widgets/useTitleBySelectedWallet';
import useUserHasAccess from 'hooks/useUserHasAccess';

import Widget from 'components/widgets/Widget';
import Filters from 'components/widgets/filters/Filters';
import LogRow from 'components/widgets/log/LogRow';
import WalletSelection from 'components/widgets/WalletSelection';
import LogMessage from 'components/widgets/log/LogMessage';

import './logs.css';

const { showModal } = logActionCreators;

const FORM_NAME = `log-filters`;

const FilterForm = reduxForm({
  form: FORM_NAME,
  onSubmit: getSubmitHandler(
    `/logs`,
    { dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }] },
  ),
})(Filters);

const tableTitles = [
  {
    title: `Тип кошелька`,
  },
  {
    title: `Номер кошелька`,
  },
  {
    title: `Тип ошибки`,
  },
  {
    title: `Сообщение`,
  },
  {
    title: `Дата`,
  },
];

const listMapping = (item, key) => <LogRow key={key} {...item} />;

const rightFilterFields = [
  {
    name: `date_range`,
    type: `date`,
  },
];

const onWalletSelectionSubmit = getSubmitHandler(
  `/logs`,
  { reduxCallbacks: [logActionCreators.hideModal] },
);

const modals = [
  {
    type: ModalType.WALLET_SELECTION,
    title: `Выберите кошелек`,
    children: <WalletSelection onSubmit={onWalletSelectionSubmit} />,
  },
  {
    type: ModalType.LOG_MESSAGE,
    title: `Сообщение`,
    children: <LogMessage />,
  },
];

const filterDateFields = [
  {
    from: `date_from`,
    to: `date_to`,
    name: `date_range`,
  },
];

const Logs = () => {
  useUserHasAccess();

  const headerButtons = useWalletSelectionHeaderButtons({ showModal, url: `/logs`, form: FORM_NAME });

  const title = useTitleBySelectedWallet({ defaultValue: `Список логов`, prefix: `Логи кошелька` });

  return (
    <Widget
      actionCreators={logActionCreators}
      widget={WidgetType.LOGS}
      extraHeaderButtons={headerButtons}
      filterFormName={FORM_NAME}
      pageTitle="Логи кошельков"
      tableTitle={title}
      tableHeadTitles={tableTitles}
      listMapping={listMapping}
      filterForm={<FilterForm rightFields={rightFilterFields} formName={FORM_NAME} dateFields={filterDateFields} />}
      modals={modals}
      withPagination
      statusBar
    />
  );
};

export default Logs;
