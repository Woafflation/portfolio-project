import React from 'react';

import { ModalType, WidgetType } from 'utils/enums';
import { widgetItemSelector } from 'selectors/widgets/widgets';
import { roleActionCreators } from 'actions/widgets/rbac/role';
import useTable from 'hooks/widgets/useTable';
import { permissionActionCreators } from 'actions/widgets/rbac/permission';

import RoleRow from 'components/widgets/role/RoleRow';
import RoleCreationForm from 'components/widgets/role/RoleCreationForm';
import UpdatingRoleForm from 'components/widgets/role/UpdatingRoleForm';
import Widget from 'components/widgets/Widget';
import PermissionList from 'components/widgets/role/PermissionList';

const { showModal } = roleActionCreators;

const tableHeadTitles = [
  {
    title: `Название`,
  },
  {
    title: `Описание`,
  },
  {
    title: `Права`,
  },
  {
    title: `Действия`,
  },
];

const listMapping = (item) => <RoleRow key={item.id} {...item} />;

const extraButtons = [
  {
    title: `Добавить роль`,
    onClick: () => showModal({ type: ModalType.CREATE }),
  },
];

const modals = [
  {
    type: ModalType.UPDATE,
    title: `Редактирование роли`,
    dataSelector: widgetItemSelector(WidgetType.ROLES),
    children: <UpdatingRoleForm />,
  },
  {
    type: ModalType.CREATE,
    title: `Создание роли`,
    children: <RoleCreationForm />,
  },
  {
    type: ModalType.PERMISSION_LIST,
    title: `Права`,
    children: <PermissionList />,
  },
];

const Roles = () => {
  useTable({
    widget: WidgetType.PERMISSIONS,
    actionCreators: permissionActionCreators,
    resetOnUnmount: false,
    loadOnlyIfNecessary: true,
  });

  return (
    <Widget
      widget={WidgetType.ROLES}
      actionCreators={roleActionCreators}
      pageTitle="Роли"
      tableTitle="Список ролей"
      tableHeadTitles={tableHeadTitles}
      listMapping={listMapping}
      extraButtons={extraButtons}
      statusBar
      modals={modals}
    />
  );
};

export default Roles;
