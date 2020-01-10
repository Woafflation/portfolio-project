import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useMount } from 'react-use';

import { WidgetType } from 'utils/enums';
import { widgetFieldSelector } from 'selectors/widgets/widgets';
import { numInput } from 'utils';
import { paytmWalletConfirmation } from 'actions/widgets/wallets/paytm';

import ModalForm from 'components/widgets/ModalForm';

const FORM = `paytm-phone-confirm`;

const fields = [
  {
    name: `sms_code`,
    label: `Введите код`,
    required: true,
    normalize: numInput,
  },
];

const PaytmPhoneConfirm = ({ ...props }) => {
  const phoneNumber = useSelector(widgetFieldSelector(WidgetType.WALLET_PAYTM, `phoneNumber`));

  useMount(() => {
    props.initialize({ wallet_identifier: phoneNumber });
  });

  return (
    <ModalForm
      {...props}
      fields={fields}
      submitText="Подтвердить"
      formName={FORM}
    />
  );
};

export default reduxForm({
  form: FORM,
  onSubmit: (values, dispatch) => dispatch(paytmWalletConfirmation(values)),
})(PaytmPhoneConfirm);
