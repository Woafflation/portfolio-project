import React from 'react';
import { reduxForm } from 'redux-form';

import { CREATE_WALLET_FORM_NAME } from 'utils/constants';
import { WalletType } from 'utils/enums';
import { paymentSystemList } from 'static/payments';

import ModalFormInput from 'components/form/ModalFormInput';
import FormField from 'components/form/FormField';

const initialValues = {
  wallet_type: WalletType.PAY_TM,
};

const WalletCreationTypeSelection = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <FormField name="wallet_type"
               data={paymentSystemList}
               component={ModalFormInput}
               type="select"
               label="Тип кошелька"
               required
    />
  </form>
);

export default reduxForm({
  form: CREATE_WALLET_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues,
})(WalletCreationTypeSelection);
