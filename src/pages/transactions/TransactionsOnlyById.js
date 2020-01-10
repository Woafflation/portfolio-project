import React from 'react';
import { reduxForm } from 'redux-form';

import { transactionsOnlyByIdActionCreators } from 'actions/widgets/transactions/transactions';
import { WidgetType } from 'utils/enums';
import getSubmitHandler from 'utils/filters/getSubmitHandler';
import transactionTableTitles from 'utils/widgets/transactions/transactionTableTitles';
import transactionListMapping from 'utils/widgets/transactions/transactionListMapping';

import Widget from 'components/widgets/Widget';
import Filters from 'components/widgets/filters/Filters';

const FORM_NAME = `transaction-only-by-id-filters`;

const FilterForm = reduxForm({
  form: FORM_NAME,
  onSubmit: getSubmitHandler(
    `/transactions-only-by-id`,
  ),
})(Filters);

const leftFilterFields = [
  {
    name: `transaction_id`,
    placeholder: `Id транзакции`,
  },
];

const TransactionsOnlyById = () => {
  return (
    <Widget
      actionCreators={transactionsOnlyByIdActionCreators}
      widget={WidgetType.TRANSACTIONS_ONLY_BY_ID}
      filterFormName={FORM_NAME}
      pageTitle="Транзакции"
      tableTitle="Транзакции по id"
      tableHeadTitles={transactionTableTitles}
      listMapping={transactionListMapping}
      filterForm={
        <FilterForm
          leftFields={leftFilterFields}
          formName={FORM_NAME}
        />
      }
      withPagination
      statusBar
      loadListOnMount={false}
      loadOnlyFilters={[`transaction_id`]}
    />
  );
};

export default TransactionsOnlyById;
