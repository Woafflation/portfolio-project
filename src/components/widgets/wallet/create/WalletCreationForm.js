import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';
import { get, includes, size, isArray, isNull } from 'lodash';

import useWizardForm from 'hooks/widgets/useWizardForm';
import { CREATE_WALLET_FORM_NAME } from 'utils/constants';
import { currencySelectionSelector } from 'selectors/widgets/currency';
import useProxySelection from 'hooks/widgets/useProxySelection';
import { ModalType, WalletType, WidgetType } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import { proxyActionCreators } from 'actions/widgets/proxy';
import { paytmParsingTypesSelector } from 'selectors/widgets/paytmParsingTypes';
import useTable from 'hooks/widgets/useTable';
import { paytmParsingTypesActionCreators } from 'actions/widgets/paytmParsingTypes';
import { paytmActionCreators } from 'actions/widgets/wallets/paytm';

import WalletCreationTypeSelection from 'components/widgets/wallet/create/WalletCreationTypeSelection';
import WalletCreationData from 'components/widgets/wallet/create/WalletCreationData';
import WizardForm from 'components/form/WizardForm';

const TABS = [
  {
    title: `Тип`,
    page: 1,
  },
  {
    title: `Данные`,
    page: 2,
  },
];

const { create, hideModal } = walletActionCreators;
const { showModal, setAnyData } = paytmActionCreators;

const onSubmit = (values, dispatch) => {
  const formData = { ...values };
  if (includes([WalletType.SKRILL, WalletType.NETELLER], formData.wallet_type)) {
    formData.wallet_identifier = formData.email_username;
  }
  if (formData.wallet_type === WalletType.PAY_TM && formData.parsing_type === `api`) {
    formData.username = formData.wallet_identifier;
  }

  dispatch(create(formData, {
    successCreationCallback: (data) => {
      const walletType = get(data, `wallet_type`);
      const identifier = get(data, `wallet_identifier`);
      if (walletType === WalletType.PAY_TM && identifier && values.parsing_type === `api`) {
        dispatch(setAnyData({ phoneNumber: identifier }));
        dispatch(showModal({ type: ModalType.SMS_CONFIRM }));
      }
    },
  }));
};

const WalletCreationForm = () => {
  const { page, setPage } = useWizardForm({ form: CREATE_WALLET_FORM_NAME });

  useTable({
    widget: WidgetType.PAYTM_PARSING_TYPES,
    actionCreators: paytmParsingTypesActionCreators,
    resetOnUnmount: false,
    loadOnlyIfNecessary: true,
  });

  const dispatch = useDispatch();
  const currencies = useSelector(currencySelectionSelector);
  const paytmParsingTypes = useSelector(paytmParsingTypesSelector);
  const values = useSelector(getFormValues(CREATE_WALLET_FORM_NAME));

  const proxySelection = useProxySelection();

  if (isNull(proxySelection)) {
    return null;
  }

  if (isArray(proxySelection) && size(proxySelection) === 0) {
    const addProxyClick = () => {
      dispatch(hideModal());
      dispatch(proxyActionCreators.showModal({ type: ModalType.CREATE }));
    };

    return (
      <div className="flex flex-column flex-align-center form-group">
        <span className="mb-10">Нет активных прокси</span>
        <button className="btn btn-alt-primary" onClick={addProxyClick}>
          Добавить прокси
        </button>
      </div>
    );
  }

  return (
    <WizardForm
      activePage={page}
      setPage={setPage}
      tabs={TABS}
      formName={CREATE_WALLET_FORM_NAME}
      submitText="Создать"
    >
      {page === 1 && <WalletCreationTypeSelection />}
      {page === 2 &&
        <WalletCreationData
          currencyList={currencies}
          proxyList={proxySelection}
          walletTypeValue={get(values, `wallet_type`)}
          onSubmit={onSubmit}
          paytmParsingTypes={paytmParsingTypes}
        />
      }
    </WizardForm>
  );
};

export default WalletCreationForm;
