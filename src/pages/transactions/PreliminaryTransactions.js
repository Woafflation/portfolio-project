import React from 'react';
import { reduxForm } from 'redux-form';

import { ModalType, WidgetType } from 'utils/enums';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import { preliminaryTransactionStatusList } from 'static/transactions';
import { preliminaryTransactionsActionCreators } from 'actions/widgets/transactions/preliminaryTransactions';

import Filters from 'components/widgets/filters/Filters';
import Widget from 'components/widgets/Widget';
import PreliminaryTransactionRow
  from 'components/widgets/transaction/preliminaryTransactions/PreliminaryTransactionRow';
import PreliminaryTransactionCreation
  from 'components/widgets/transaction/preliminaryTransactions/PreliminaryTransactionCreation';
import PreliminaryTransactionDelete
  from 'components/widgets/transaction/preliminaryTransactions/PreliminaryTransactionDelete';

const { showModal } = preliminaryTransactionsActionCreators;

const FORM_NAME = `preliminary-transaction-filters`;

const FilterForm = reduxForm({
  form: FORM_NAME,
  onSubmit: getSubmitHandler(
    `/preliminary-transactions`,
    { dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }] },
  ),
})(Filters);

const leftFilterFields = [
  {
    name: `status`,
    placeholder: `Статус`,
    type: `select`,
    data: preliminaryTransactionStatusList,
  },
  {
    name: `transaction_id`,
    placeholder: `Id транзакции`,
  },
];

const rightFilterFields = [
  {
    name: `date_range`,
    type: `date`,
  },
];

const modals = [
  {
    type: ModalType.CREATE,
    title: `Создание предтранзакции`,
    children: <PreliminaryTransactionCreation/>,
  },
  {
    type: ModalType.DELETE_PRELIMINARY_TRANSACTION,
    title: `Удаление предтранзакции`,
    children: <PreliminaryTransactionDelete/>,
  },
];

const filterDateFields = [
  {
    from: `date_from`,
    to: `date_to`,
    name: `date_range`,
  },
];

const titles = [
  {
    title: `Номер транзакции`,
  },
  {
    title: `Сумма`,
  },
  {
    title: `Дата добавления`,
  },
  {
    title: `Статус`,
  },
];

const extraButtons = [
  {
    title: `Создать транзакцию`,
    onClick: () => showModal({ type: ModalType.CREATE }),
    buttonClassName: `btn-success`,
  },
];

const listMapping = (item) => <PreliminaryTransactionRow key={item.primary_id} {...item}/>;

const PreliminaryTransactions = () => {
  return (
    <Widget
      actionCreators={preliminaryTransactionsActionCreators}
      widget={WidgetType.PRELIMINARY_TRANSACTIONS}
      filterFormName={FORM_NAME}
      pageTitle="Предтранзакции"
      tableTitle="Список предтранзакций"
      tableHeadTitles={titles}
      listMapping={listMapping}
      filterForm={
        <FilterForm
          leftFields={leftFilterFields}
          rightFields={rightFilterFields}
          formName={FORM_NAME}
          dateFields={filterDateFields}
        />
      }
      extraButtons={extraButtons}
      modals={modals}
      withPagination
      statusBar
    />
  );
};

export default PreliminaryTransactions;
