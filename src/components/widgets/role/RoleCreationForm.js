import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';

import { permissionSelectionSelector } from 'selectors/widgets/permission';
import { FieldType, WidgetType } from 'utils/enums';
import { roleActionCreators } from 'actions/widgets/rbac/role';
import { CREATE_ROLE_FORM_NAME } from 'utils/constants';
import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';

import ModalForm from 'components/widgets/ModalForm';

const onSubmit = (values, dispatch) => dispatch(roleActionCreators.create(values));

const RoleCreationForm = (props) => {
  const permissionList = useSelector(permissionSelectionSelector);
  const submitting = useSelector(widgetModalSubmittingSelector(WidgetType.ROLES)) || false;

  const fields = [
    {
      name: `name`,
      label: `Название`,
      required: true,
    },
    {
      name: `slug`,
      label: `Идентификатор`,
      required: true,
    },
    {
      name: `description`,
      label: `Описание`,
      required: true,
      type: `textarea`,
    },
    {
      name: `permissions`,
      title: `Права`,
      data: permissionList,
      fieldType: FieldType.CHECKBOX_GROUP,
    },
  ];

  return (
    <ModalForm
      fields={fields}
      onSubmit={onSubmit}
      formName={CREATE_ROLE_FORM_NAME}
      submitText="Создать"
      submitting={submitting}
      {...props}
    />
  );
};

export default reduxForm({ form: CREATE_ROLE_FORM_NAME })(RoleCreationForm);
