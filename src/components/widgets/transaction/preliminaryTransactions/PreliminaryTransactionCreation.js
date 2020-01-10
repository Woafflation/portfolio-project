import React from 'react';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

import { preliminaryTransactionsActionCreators } from 'actions/widgets/transactions/preliminaryTransactions';
import { currencySelectionSelector } from 'selectors/widgets/currency';
import { CREATE_PRELIMINARY_TRANSACTION_FORM_NAME } from 'utils/constants';
import { numInput } from 'utils';

import ModalFormInput from 'components/form/ModalFormInput';
import FormField from 'components/form/FormField';

const { create, showCreationModalAfterCreating } = preliminaryTransactionsActionCreators;

const PreliminaryTransactionCreation = ({ submitting, initialize, handleSubmit }) => {
  const dispatch = useDispatch();
  const currencies = useSelector(currencySelectionSelector);

  useMount(() => {
    initialize({ currency_code: `INR` });
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        name="key1"
        label="Номер транзакции"
        required
        component={ModalFormInput}
      />
      <FormField
        name="amount"
        label="Сумма"
        required
        component={ModalFormInput}
        normalize={numInput}
      />
      <FormField
        name="currency_code"
        label="Валюта"
        required
        component={ModalFormInput}
        type="select"
        data={currencies}
      />
      <div className="modal__control-button">
        <button className="btn btn-alt-success" disabled={submitting}>Создать</button>
        <button
          className="btn btn-alt-primary"
          disabled={submitting}
          onClick={() => dispatch(showCreationModalAfterCreating(true))}
        >
          Создать и создать еще одну
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: CREATE_PRELIMINARY_TRANSACTION_FORM_NAME,
  onSubmit: (values, dispatch) => dispatch(create(values)),
})(PreliminaryTransactionCreation);
