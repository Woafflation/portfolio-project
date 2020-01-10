import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FieldType, WidgetType } from 'utils/enums';
import { roleActionCreators } from 'actions/widgets/rbac/role';
import { CREATE_USER_FORM_NAME } from 'utils/constants';
import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';
import { roleSelectionSelector } from 'selectors/widgets/role';
import { userActionCreators } from 'actions/widgets/rbac/user';
import useTable from 'hooks/widgets/useTable';

import ModalForm from 'components/widgets/ModalForm';

const onSubmit = (values, dispatch) => dispatch(userActionCreators.create(values));

const UserCreationForm = (props) => {
  useTable({ widget: WidgetType.ROLES, actionCreators: roleActionCreators });

  const roleList = useSelector(roleSelectionSelector);
  const submitting = useSelector(widgetModalSubmittingSelector(WidgetType.USERS)) || false;

  const fields = [
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

  return (
    <ModalForm
      fields={fields}
      onSubmit={onSubmit}
      formName={CREATE_USER_FORM_NAME}
      submitText="Создать"
      submitting={submitting}
      {...props}
    />
  );
};

export default reduxForm({ form: CREATE_USER_FORM_NAME })(UserCreationForm);
