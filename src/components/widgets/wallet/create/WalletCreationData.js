import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFormValues, reduxForm } from 'redux-form';
import { map, isEqual, get } from 'lodash';
import { useSelector } from 'react-redux';

import { CREATE_WALLET_FORM_NAME } from 'utils/constants';
import { WalletType } from 'utils/enums';

import ModalFormInput from 'components/form/ModalFormInput';
import FormField from 'components/form/FormField';

const WalletCreationData = ({ currencyList, proxyList, handleSubmit, walletTypeValue, paytmParsingTypes }) => {
  const [fields, setFields] = useState([]);

  const values = useSelector(getFormValues(CREATE_WALLET_FORM_NAME));

  useEffect(() => {
    let newFields;
    switch (walletTypeValue) {
      case WalletType.PERFECT_MONEY:
        newFields = [
          {
            name: `username`,
            label: `ID`,
            required: true,
          },
          {
            name: `password`,
            label: `Пароль`,
            password: true,
            required: true,
          },
          {
            name: `wallet_identifier`,
            label: `Номер счета`,
            required: true,
          },
          {
            name: `perfect_money_code`,
            label: `Ключ аккаунта`,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
        ];
        break;
      case WalletType.EPAY:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Инедтификатор счёта (email)`,
            required: true,
          },
          {
            name: `api_key`,
            label: `Api Key`,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: true,
          },
        ];
        break;
      case WalletType.HELP_2_PAY:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Merchant Code`,
            required: true,
          },
          {
            name: `security_code`,
            label: `Security Code`,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: false,
          },
        ];
        break;
      case WalletType.CERTUS_FINANCE:
        newFields = [
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
            name: `wallet_identifier`,
            label: `Account username`,
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
            data: currencyList,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: false,
          },
        ];
        break;
      case WalletType.BANK_DIRECT:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Identifier`,
            required: true,
          },
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
            data: currencyList,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: false,
          },
        ];
        break;
      case WalletType.PAY_TM:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Номер кошелька`,
            required: true,
          },
          {
            name: `password`,
            label: `Пароль кошелька`,
            hidden: true,
            password: true,
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
            password: true,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
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

        if (get(values, `parsing_type`) === `api`) {
          newFields = map(newFields, (field) => {
            return field.name === `password` ? ({ ...field, required: true, hidden: false }) : field;
          });
        }
        break;
      case WalletType.BKASH:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Номер кошелька`,
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
            password: true,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
        ];
        break;
      case WalletType.UPI:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Номер кошелька`,
            required: true,
          },
          {
            name: `account_name`,
            label: `Account name`,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: false,
          },
        ];
        break;
      case WalletType.DUSUPAY:
        newFields = [
          {
            name: `wallet_identifier`,
            label: `Номер кошелька`,
            required: true,
          },
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
            data: currencyList,
            required: true,
          },
        ];
        break;
      default:
        newFields = [
          {
            name: `email_username`,
            label: `Email почты`,
            required: true,
            email: true,
          },
          {
            name: `email_password`,
            label: `Пароль почты`,
            password: true,
            required: true,
          },
          {
            name: `proxy_id`,
            label: `Прокси`,
            type: `select`,
            data: proxyList,
            required: true,
          },
          {
            name: `currency_code`,
            label: `Валюта`,
            type: `select`,
            data: currencyList,
            required: true,
          },
        ];
    }

    if (!isEqual(fields, newFields)) {
      setFields(newFields);
    }
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      {map(fields, (field, key) => <FormField key={key} component={ModalFormInput} {...field} />)}
    </form>
  );
};

WalletCreationData.propTypes = {
  currencyList: PropTypes.array.isRequired,
  proxyList: PropTypes.array.isRequired,
  paytmParsingTypes: PropTypes.array.isRequired,
  walletTypeValue: PropTypes.string.isRequired,
};

export default reduxForm({
  form: CREATE_WALLET_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(WalletCreationData);
