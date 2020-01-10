import React, { useEffect, useState } from 'react';
import { isArray, isNull, size, get } from 'lodash';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

import useUpdateWidgetForm from 'hooks/widgets/useUpdateWidgetForm';
import { WalletType, WidgetType } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import useProxySelection from 'hooks/widgets/useProxySelection';
import { UPDATE_WALLET_FORM_NAME } from 'utils/constants';
import { currencySelectionSelector } from 'selectors/widgets/currency';
import { paytmParsingTypesSelector } from 'selectors/widgets/paytmParsingTypes';
import useTable from 'hooks/widgets/useTable';
import { paytmParsingTypesActionCreators } from 'actions/widgets/paytmParsingTypes';

import ModalForm from 'components/widgets/ModalForm';
import Preloader from 'components/preloader/Preloader';

const WalletUpdatingForm = (props) => {
  const [fields, setFields] = useState([]);

  const currencies = useSelector(currencySelectionSelector);

  const proxySelection = useProxySelection();

  const paytmParsingTypes = useSelector(paytmParsingTypesSelector);

  useTable({
    widget: WidgetType.PAYTM_PARSING_TYPES,
    actionCreators: paytmParsingTypesActionCreators,
    resetOnUnmount: false,
    loadOnlyIfNecessary: true,
  });

  const { item, ...formProps } = useUpdateWidgetForm({
    widget: WidgetType.WALLETS,
    actionCreators: walletActionCreators,
    initialize: props.initialize,
    itemAdapter: ({
      proxy,
      password,
      email_username,
      email_password,
      type,
      currency,
      perfect_money_code,
      username,
      security_code,
      api_key,
      merchant_id,
      merchant_account_id,
      account_key,
      account_password,
      parsing_type,
      account_name,
      account_number,
      ifsc_code,
      token,
      secret_key,
    }) => {
      const initial = {};
      switch (type) {
        case WalletType.SKRILL:
        case WalletType.NETELLER:
        case WalletType.BKASH:
          initial.proxy_id = get(proxy, `id`);
          initial.currency_code = get(currency, `code`);
          initial.email_username = email_username;
          initial.email_password = email_password;
          break;
        case WalletType.PAY_TM:
          initial.proxy_id = get(proxy, `id`);
          initial.currency_code = get(currency, `code`);
          initial.email_username = email_username;
          initial.email_password = email_password;
          initial.parsing_type = parsing_type;
          break;
        case WalletType.PERFECT_MONEY:
          initial.proxy_id = get(proxy, `id`);
          initial.currency_code = get(currency, `code`);
          initial.perfect_money_code = perfect_money_code;
          initial.username = username;
          initial.password = password;
          break;
        case WalletType.EPAY:
          initial.currency_code = get(currency, `code`);
          initial.api_key = api_key;
          initial.proxy_id = get(proxy, `id`);
          break;
        case WalletType.HELP_2_PAY:
          initial.currency_code = get(currency, `code`);
          initial.security_code = security_code;
          initial.proxy_id = get(proxy, `id`);
          break;
        case WalletType.CERTUS_FINANCE:
          initial.currency_code = get(currency, `code`);
          initial.merchant_id = merchant_id;
          initial.merchant_account_id = merchant_account_id;
          initial.account_key = account_key;
          initial.account_password = account_password;
          initial.proxy_id = get(proxy, `id`);
          break;
        case WalletType.BANK_DIRECT:
          initial.currency_code = get(currency, `code`);
          initial.account_name = account_name;
          initial.account_number = account_number;
          initial.ifsc_code = ifsc_code;
          initial.proxy_id = get(proxy, `id`);
          break;
        case WalletType.UPI:
          initial.currency_code = get(currency, `code`);
          initial.account_name = account_name;
          initial.proxy_id = get(proxy, `id`);
          break;
        case WalletType.DUSUPAY:
          initial.secret_key = secret_key;
          initial.api_key = api_key;
          initial.wallet_token = token;
          initial.currency_code = get(currency, `code`);
          break;
        default:
      }

      return initial;
    },
  });

  useEffect(() => {
    if (isArray(proxySelection) && size(proxySelection) > 0 && item && item.type) {
      let fields;
      switch (item.type) {
        case WalletType.PERFECT_MONEY:
          fields = [
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: true,
            },
            {
              name: `perfect_money_code`,
              label: `Ключ аккаунта`,
              required: true,
            },
            {
              name: `username`,
              label: `Username`,
              required: true,
            },
            {
              name: `password`,
              label: `Password`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
          ];
          break;
        case WalletType.EPAY:
          fields = [
            {
              name: `api_key`,
              label: `Api Key`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: true,
            },
          ];
          break;
        case WalletType.UPI:
          fields = [
            {
              name: `account_name`,
              label: `Account name`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: false,
            },
          ];
          break;
        case WalletType.HELP_2_PAY:
          fields = [
            {
              name: `security_code`,
              label: `Security Code`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: false,
            },
          ];
          break;
        case WalletType.DUSUPAY:
          fields = [
            {
              name: `api_key`,
              label: `Api key`,
              required: true,
            },
            {
              name: `secret_key`,
              label: `Secret key`,
              required: true,
            },
            {
              name: `wallet_token`,
              label: `Token`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
          ];
          break;
        case WalletType.CERTUS_FINANCE:
          fields = [
            {
              name: `merchant_id`,
              label: `Merchant ID`,
              required: true,
            },
            {
              name: `merchant_account_id`,
              label: `Merchant account ID`,
              required: true,
            },
            {
              name: `account_key`,
              label: `Key`,
              required: true,
            },
            {
              name: `account_password`,
              label: `Account password`,
              password: true,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: false,
            },
          ];
          break;
        case WalletType.BANK_DIRECT:
          fields = [
            {
              name: `account_name`,
              label: `Account name`,
              required: true,
            },
            {
              name: `account_number`,
              label: `Account number`,
              required: true,
            },
            {
              name: `ifsc_code`,
              label: `IFSC code`,
              required: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: false,
            },
          ];
          break;
        case WalletType.PAY_TM:
          fields = [
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: true,
            },
            {
              name: `email_username`,
              label: `Email почты`,
              required: true,
              email: true,
            },
            {
              name: `email_password`,
              label: `Пароль почты`,
              required: true,
              password: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
            {
              name: `parsing_type`,
              type: `select`,
              label: `Тип парсинга`,
              data: paytmParsingTypes,
              required: true,
            },
          ];
          break;
        default:
          fields = [
            {
              name: `proxy_id`,
              type: `select`,
              label: `Proxy`,
              data: proxySelection,
              required: true,
            },
            {
              name: `email_username`,
              label: `Email почты`,
              required: true,
              email: true,
            },
            {
              name: `email_password`,
              label: `Пароль почты`,
              required: true,
              password: true,
            },
            {
              name: `currency_code`,
              label: `Валюта`,
              type: `select`,
              data: currencies,
              required: true,
            },
          ];
      }

      setFields(fields);
    }
  }, [proxySelection, item]);

  if (isNull(proxySelection) || isNull(item)) {
    return <Preloader/>;
  }

  return (
    <ModalForm
      {...props}
      {...formProps}
      fields={fields}
      submitText="Обновить"
      formName={UPDATE_WALLET_FORM_NAME}
    />
  );
};

export default reduxForm({ form: UPDATE_WALLET_FORM_NAME })(WalletUpdatingForm);
