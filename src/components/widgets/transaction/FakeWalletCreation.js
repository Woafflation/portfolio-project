import React from 'react';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import useMount from 'react-use/lib/useMount';

import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';
import { transactionActionCreators } from 'actions/widgets/transactions/transactions';
import { WalletType, WidgetType } from 'utils/enums';
import { currencySelectionSelector } from 'selectors/widgets/currency';
import { CREATE_TRANSACTION_FORM_NAME } from 'utils/constants';

import ModalForm from 'components/widgets/ModalForm';

const FakeWalletCreation = (props) => {
  const dispatch = useDispatch();
  const submitting = useSelector(widgetModalSubmittingSelector(WidgetType.TRANSACTIONS)) || false;

  const currencies = useSelector(currencySelectionSelector);

  useMount(() => {
    props.initialize({ wallet_type: WalletType.PAY_TM });
  });

  /**
   * @param {Object} values
   */
  const onSubmit = (values) => dispatch(transactionActionCreators.create(values));

  return (
    <ModalForm
      {...props}
      onSubmit={onSubmit}
      submitting={submitting}
      formName={CREATE_TRANSACTION_FORM_NAME}
      submitText="Сгенерировать"
      fields={[
        {
          name: `amount`,
          label: `Сумма`,
          required: true,
        },
        {
          name: `currency_code`,
          label: `Валюта`,
          type: `select`,
          data: currencies,
          required: true,
        },
      ]}
    />
  );
};

export default reduxForm({ form: CREATE_TRANSACTION_FORM_NAME })(FakeWalletCreation);
