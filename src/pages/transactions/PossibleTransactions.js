import React from 'react';
import { reduxForm } from 'redux-form';

import { ModalType, WidgetType } from 'utils/enums';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import { possibleTransactionActionCreators } from 'actions/widgets/transactions/possibleTransactions';

import Filters from 'components/widgets/filters/Filters';
import Widget from 'components/widgets/Widget';
import PossibleTransactionItem from 'components/widgets/transaction/possibleTransactions/PossibleTransactionItem';
import PossibleTransactionRow from 'components/widgets/transaction/possibleTransactions/PossibleTransactionRow';

const FILTER_FORM_NAME = `transactions-management-filters`;

const FilterForm = reduxForm({
  form: FILTER_FORM_NAME,
  onSubmit: getSubmitHandler(
    `/possible-transactions`,
    { dateFields: [{ name: `date_range`, fromName: `date_from`, toName: `date_to` }] },
  ),
})(Filters);

const leftFilterFields = [
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

const filterDateFields = [
  {
    from: `date_from`,
    to: `date_to`,
    name: `date_range`,
  },
];

const tableTitles = [
  {
    title: `Тип`,
  },
  {
    title: `Номер транзакции`,
  },
  {
    title: `Дата создания`,
  },
  {
    title: `Действия`,
  },
  {
    title: ``,
  },
];

const modals = [
  {
    type: ModalType.UPDATE,
    title: `Транзакций`,
    children: <PossibleTransactionItem/>,
  },
];

const listMapping = (item) => <PossibleTransactionRow key={item.primary_id} {...item}/>;

const PossibleTransactions = () => {
  return (
    <Widget
      actionCreators={possibleTransactionActionCreators}
      widget={WidgetType.POSSIBLE_TRANSACTIONS}
      filterFormName={FILTER_FORM_NAME}
      pageTitle="Возможные транзакции"
      tableTitle="Транзакции"
      tableHeadTitles={tableTitles}
      listMapping={listMapping}
      filterForm={
        <FilterForm
          leftFields={leftFilterFields}
          rightFields={rightFilterFields}
          formName={FILTER_FORM_NAME}
          dateFields={filterDateFields}
          numFields={[`fake_flag`]}
        />
      }
      withPagination
      statusBar
      modals={modals}
    />
  );
};

export default PossibleTransactions;
