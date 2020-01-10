import React from 'react';
import { reduxForm } from 'redux-form';
import { each, toNumber, map, find } from 'lodash';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import { useDispatch, useSelector } from 'react-redux';

import useWidgetItem from 'hooks/widgets/useWidgetItem';
import { numInput } from 'utils';
import { ModalType, Permission, PluginColorScheme, WidgetType, WalletType } from 'utils/enums';
import { pluginActionCreators } from 'actions/widgets/plugin';
import { currencySelectionSelector, currencyWithIdSelectionSelector } from 'selectors/widgets/currency';
import { hasAccessSelector } from 'selectors/auth';
import { PLUGIN_FORM_NAME } from 'utils/constants';

import SubmitBtn from 'components/widgets/settings/SubmitBtn';
import FormInput from 'components/form/FormInput';
import FormField from 'components/form/FormField';
import Modal from 'components/widgets/Modal';

const COLOR_SCHEME_LIST = [
  {
    value: PluginColorScheme.LIGHT,
    text: `Light`,
  },
  {
    value: PluginColorScheme.DARK,
    text: `Dark`,
  },
  {
    value: PluginColorScheme.WHITE_GREEN,
    text: `White Green`,
  },
];

const convertSettingsToFormValues = (params, currenciesWithId) => {
  const formParams = {};

  each(params, (value, key) => {
    if (key === `currency` && value.code) {
      formParams.currency_code = value.code;
    } else if (key === `minimum_deposit`) {
      formParams.minimum_deposit = {};
      each(WalletType, (walletName) => {
        if (params.minimum_deposit[walletName]) {
          const currentCurrency =
            find(currenciesWithId, { extra: params.minimum_deposit[walletName].currency });

          formParams.minimum_deposit[walletName] = {
            amount: params.minimum_deposit[walletName].amount,
            currency_id: currentCurrency && currentCurrency.value,
          };
        }
      });
    } else if (key === `wallets`) {
      each(value, (walletValue, walletKey) => {
        formParams[walletKey] = !!toNumber(walletValue);
      });
    } else {
      formParams[key] = value;
    }
  });

  return formParams;
};

const onSubmit = (values, dispatch) => {

  dispatch(pluginActionCreators.updateItem(values));
};

const PluginSettingsForm = ({ handleSubmit, initialize, submitting }) => {
  const dispatch = useDispatch();
  const pluginAccess = useSelector(hasAccessSelector(Permission.PLUGIN_SETTINGS));
  const pluginClientAccess = useSelector(hasAccessSelector(Permission.PLUGIN_SETTINGS_CLIENT));
  const currenciesWithId = useSelector(currencyWithIdSelectionSelector);
  const currencies = useSelector(currencySelectionSelector);

  const plugin = useWidgetItem({ widget: WidgetType.PLUGIN, actionCreators: pluginActionCreators });

  useUpdateEffect(() => {
    initialize(convertSettingsToFormValues(plugin, currenciesWithId));
  }, [plugin, currenciesWithId]);

  const {
    showModal,
  } = pluginActionCreators;

  return (
    <div className="col-xl-4 col-lg-5 col-md-7">
      <button
        onClick={() => dispatch(showModal({ type: ModalType.MINIMUM_DEPOSIT_LIST }))}
        className="btn btn-md btn-secondary mb-15"
      >
        Настройка мин депозита
      </button>
      <form className="change-password-form js-validation-signin" onSubmit={handleSubmit}>
        <Modal
          type={ModalType.MINIMUM_DEPOSIT_LIST}
          title="Minimum deposit"
          widget={WidgetType.PLUGIN}
          actionCreators={pluginActionCreators}
        >
          {map(WalletType, (objValue, objKey) => {
            return (<div key={objValue}>
              <h4>{objKey}</h4>
              <div className="flex flex-row justify-content-between">
                <FormField name={`minimum_deposit.${objValue}.amount`}
                           component={FormInput}
                           type="text"
                           label="Minimum deposit"
                           normalize={numInput}
                           half
                           marginRight
                />
                <FormField name={`minimum_deposit.${objValue}.currency_id`}
                           component={FormInput}
                           type="select"
                           label="Currency"
                           data={currenciesWithId}
                           half
                />
              </div>
            </div>);
          })}
        </Modal>
        <FormField name={`currency_code`}
                   component={FormInput}
                   type="select"
                   label="Dashboard currency"
                   data={currencies}
                   half
        />
        <FormField name="payment_plugin_color_scheme"
                   component={FormInput}
                   type="select"
                   label="Color scheme"
                   data={COLOR_SCHEME_LIST}
        />
        <FormField name="postback_url" component={FormInput} type="text" label="Postback url"/>
        {!pluginAccess && pluginClientAccess
          ? null
          : <>
            <FormField name="postback_access_key" component={FormInput} type="text" label="Postback access key"/>
            <FormField
              name="postback_private_access_key"
              component={FormInput}
              type="text"
              label="Postback private access key"
            />
          </>}
        <FormField name="company_name" component={FormInput} type="text" label="Company name"/>
        <FormField name="payment_url" component={FormInput} type="text" label="Payment url on success"/>
        <FormField name="no_payment_url" component={FormInput} type="text" label="Payment url on error"/>

        <FormField name="wallet_paytm" component={FormInput} type="checkbox" label="PayTM"/>
        <FormField name="wallet_skrill" component={FormInput} type="checkbox" label="Skrill"/>
        <FormField name="wallet_neteller" component={FormInput} type="checkbox" label="Neteller"/>
        <FormField name="wallet_paypal" component={FormInput} type="checkbox" label="Paypal"/>
        <FormField name="wallet_perfect_money" component={FormInput} type="checkbox" label="Perfect money"/>
        <FormField name="wallet_epay" component={FormInput} type="checkbox" label="Epay"/>
        <FormField name="wallet_help2pay" component={FormInput} type="checkbox" label="Help2Pay"/>
        <FormField name="wallet_certus_fin" component={FormInput} type="checkbox" label="Certus finance"/>
        <FormField name="wallet_bank_direct" component={FormInput} type="checkbox" label="Bank direct"/>
        <FormField name="wallet_upi" component={FormInput} type="checkbox" label="Upi"/>
        <FormField name="wallet_bkash" component={FormInput} type="checkbox" label="BKash"/>
        <FormField name="wallet_dusupay" component={FormInput} type="checkbox" label="Dusupay"/>
        <SubmitBtn submitting={submitting}>Сохранить</SubmitBtn>
      </form>
    </div>
  );
};

export default reduxForm({ form: PLUGIN_FORM_NAME, onSubmit })(PluginSettingsForm);
