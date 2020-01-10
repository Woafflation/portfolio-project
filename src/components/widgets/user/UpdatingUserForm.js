import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { map } from 'lodash';

import useUpdateWidgetForm from 'hooks/widgets/useUpdateWidgetForm';
import { FieldType, WidgetType } from 'utils/enums';
import { roleActionCreators } from 'actions/widgets/rbac/role';
import { UPDATE_USER_FORM_NAME } from 'utils/constants';
import useTable from 'hooks/widgets/useTable';
import { roleSelectionSelector } from 'selectors/widgets/role';
import { userActionCreators } from 'actions/widgets/rbac/user';
import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';

import ModalForm from 'components/widgets/ModalForm';

const UpdatingUserForm = (props) => {
  useTable({ widget: WidgetType.ROLES, actionCreators: roleActionCreators });

  const roleList = useSelector(roleSelectionSelector);
  const submitting = useSelector(widgetModalSubmittingSelector(WidgetType.USERS)) || false;

  const getFields = () => [
    {
      name: `name`,
      label: `Название`,
      required: true,
    },
    {
      name: `email`,
      label: `Email`,
      required: true,
      email: true,
    },
    {
      name: `password`,
      label: `Пароль`,
      required: true,
      password: true,
    },
    {
      name: `roles`,
      title: `Роли`,
      data: roleList,
      fieldType: FieldType.CHECKBOX_GROUP,
    },
  ];

  const formProps = useUpdateWidgetForm({
    widget: WidgetType.USERS,
    getFields,
    actionCreators: userActionCreators,
    initialize: props.initialize,
    itemAdapter: ({ name, email, password, roles }) => ({
      name,
      email,
      password,
      roles: map(roles, ({ id }) => id),
    }),
  });

  if (!formProps || !formProps.item) {
    return null;
  }

  return (
    <ModalForm
      {...props}
      {...formProps}
      formName={UPDATE_USER_FORM_NAME}
      submitText="Редактировать"
      submitting={submitting}
    />
  );
};

export default reduxForm({ form: UPDATE_USER_FORM_NAME })(UpdatingUserForm);
