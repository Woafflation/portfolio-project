import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalType, Permission, WidgetType } from 'utils/enums';
import { checkProxyStatusRequest, proxyActionCreators } from 'actions/widgets/proxy';
import { UPDATE_PROXY_FORM_NAME } from 'utils/constants';
import { widgetItemSelector } from 'selectors/widgets/widgets';
import { hasAccessSelector } from 'selectors/auth';
import { proxyTypeList } from 'static/proxies';

import ProxyRow from 'components/widgets/proxy/ProxyRow';
import createForm from 'componentCreators/widgets/createForm';
import Widget from 'components/widgets/Widget';

import 'pages/proxies/proxies.css';
import useUserHasAccess from 'hooks/useUserHasAccess';

const { remove, showModal } = proxyActionCreators;

const tableHeadTitles = [
  {
    title: `IP:Port`,
    className: `proxy-list__thead--ip`,
  },
  {
    title: `Тип`,
  },
  {
    title: ``,
    className: `proxy-list__thead--status`,
  },
  {
    title: `Действия`,
    className: `proxy-list__thead--actions`,
  },
];

const listMapping = (item) => (
  <ProxyRow
    key={item.id}
    {...item}
    onRemove={() => remove(item.id)}
    onUpdate={() => showModal({ type: ModalType.UPDATE, id: item.id })}
    onCheck={() => checkProxyStatusRequest(item.id)}
  />
);

const modals = [
  {
    type: ModalType.UPDATE,
    title: `Редактировать прокси`,
    dataSelector: widgetItemSelector(WidgetType.PROXIES),
    children: createForm({
      form: UPDATE_PROXY_FORM_NAME,
      type: ModalType.UPDATE,
      props: {
        submitText: `Обновить`,
        actionCreators: proxyActionCreators,
        getFields: () => [
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
        itemAdapter: ({ ip, port, username, password, type }) => ({ ip, port, username, password, type }),
      },
    }),
  },
  // Proxy creation modal is general, so it placed in the component "GeneralModals"
];

const Proxies = () => {
  useUserHasAccess();
  const [extraButtons, setExtraButtons] = useState([]);

  const addProxyAccess = useSelector(hasAccessSelector(Permission.PROXY_CREATE));

  useEffect(() => {
    const extraButtons = [];
    if (addProxyAccess) {
      extraButtons.push({
        title: `Добавить прокси`,
        onClick: () => showModal({ type: ModalType.CREATE }),
      });
    }
    setExtraButtons(extraButtons);
  }, [addProxyAccess]);

  return (
    <Widget
      widget={WidgetType.PROXIES}
      actionCreators={proxyActionCreators}
      pageTitle="Мои прокси"
      tableTitle="Список прокси"
      tableHeadTitles={tableHeadTitles}
      listMapping={listMapping}
      extraButtons={extraButtons}
      modals={modals}
      statusBar
    />
  );
};

export default Proxies;
