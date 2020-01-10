import React from 'react';

import createWidget from 'componentCreators/widgets/createWidget';
import { ModalType, WidgetType } from 'utils/enums';
import { widgetItemSelector } from 'selectors/widgets/widgets';
import { userActionCreators } from 'actions/widgets/rbac/user';

import UserRow from 'components/widgets/user/UserRow';
import UserCreationForm from 'components/widgets/user/UserCreationForm';
import UpdatingUserForm from 'components/widgets/user/UpdatingUserForm';
import RoleList from 'components/widgets/user/RoleList';

const { showModal } = userActionCreators;

const Users = createWidget({
  widget: WidgetType.USERS,
  actionCreators: userActionCreators,
  pageTitle: `Пользователи`,
  tableTitle: `Список пользователей`,
  tableHeadTitles: [
    {
      title: `Логин`,
    },
    {
      title: `Создан`,
    },
    {
      title: `Последнее редактирование`,
    },
    {
      title: `Роли`,
    },
    {
      title: `Действия`,
    },
  ],
  listMapping: (item) => <UserRow key={item.id} {...item} />,
  extraButtons: [
    {
      title: `Добавить пользователя`,
      onClick: () => showModal({ type: ModalType.CREATE }),
    },
  ],
  modals: [
    {
      type: ModalType.UPDATE,
      title: `Редактирование пользователя`,
      dataSelector: widgetItemSelector(WidgetType.USERS),
      children: <UpdatingUserForm />,
    },
    {
      type: ModalType.CREATE,
      title: `Создание пользователя`,
      children: <UserCreationForm />,
    },
    {
      type: ModalType.ROLE_LIST,
      title: `Список ролей`,
      children: <RoleList />,
    },
  ],
  statusBar: true,
});

export default Users;
