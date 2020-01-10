import React from 'react';
import { map } from 'lodash';

import { ModalType, WidgetType } from 'utils/enums';
import { walletActionCreators } from 'actions/widgets/wallet';
import createForm from 'componentCreators/widgets/createForm';
import { CREATE_PROXY_FORM_NAME } from 'utils/constants';
import { proxyActionCreators } from 'actions/widgets/proxy';
import withShowWidget from 'hocs/withShowWidget';
import { widgetItemSelector, widgetListSelector } from 'selectors/widgets/widgets';
import { paytmActionCreators } from 'actions/widgets/wallets/paytm';
import { proxyTypeList } from 'static/proxies';

import WalletItem from 'components/widgets/wallet/WalletItem';
import WalletCreationForm from 'components/widgets/wallet/create/WalletCreationForm';
import Modal from 'components/widgets/Modal';
import PaytmPhoneConfirm from 'components/widgets/wallets/paytm/PaytmPhoneConfirm';

const ShowModal = withShowWidget(WalletItem, { widget: WidgetType.WALLETS, actionCreators: walletActionCreators });

/**
 * @type {{
 *   type: ModalType,
 *   children: React.ReactNode,
 *   title: string,
 *   widget: WidgetType,
 *   actionCreators: WidgetActionCreators,
 * }[]}
 */
const modalList = [
  {
    type: ModalType.SMS_CONFIRM,
    title: `Подтверждение телефона`,
    actionCreators: paytmActionCreators,
    widget: WidgetType.WALLET_PAYTM,
    children: <PaytmPhoneConfirm />,
  },
  {
    type: ModalType.SHOW,
    title: `Кошелек`,
    actionCreators: walletActionCreators,
    widget: WidgetType.WALLETS,
    children: <ShowModal />,
    dataSelector: widgetItemSelector(WidgetType.WALLETS),
  },
  {
    type: ModalType.CREATE,
    widget: WidgetType.WALLETS,
    title: `Создать кошелек`,
    actionCreators: walletActionCreators,
    children: <WalletCreationForm />,
    dataSelector: widgetListSelector(WidgetType.PROXIES),
  },
  {
    type: ModalType.CREATE,
    title: `Создать прокси`,
    actionCreators: proxyActionCreators,
    widget: WidgetType.PROXIES,
    children: createForm({
      form: CREATE_PROXY_FORM_NAME,
      type: ModalType.CREATE,
      props: {
        submitText: `Создать`,
        actionCreators: proxyActionCreators,
        fields: [
          {
            name: `ip`,
            label: `IP`,
            required: true,
          },
          {
            name: `port`,
            label: `Port`,
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
            password: true,
          },
          {
            name: `type`,
            label: `Тип`,
            type: `select`,
            data: proxyTypeList,
            required: true,
          },
        ],
        widget: WidgetType.PROXIES,
      },
    }),
  },
];

const GeneralModals = () => {
  return map(modalList, (modal, key) => <Modal key={key} {...modal} />);
};

export default GeneralModals;
