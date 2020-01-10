import React from 'react';
import { useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { map } from 'lodash';

import useUpdateWidgetForm from 'hooks/widgets/useUpdateWidgetForm';
import { FieldType, WidgetType } from 'utils/enums';
import { permissionSelectionSelector } from 'selectors/widgets/permission';
import { roleActionCreators } from 'actions/widgets/rbac/role';
import { UPDATE_ROLE_FORM_NAME } from 'utils/constants';
import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';

import ModalForm from 'components/widgets/ModalForm';

const UpdatingRoleForm = (props) => {
  const permissionList = useSelector(permissionSelectionSelector);
  const submitting = useSelector(widgetModalSubmittingSelector(WidgetType.ROLES)) || false;
  const getFields = () => [
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

  const formProps = useUpdateWidgetForm({
    widget: WidgetType.ROLES,
    getFields,
    actionCreators: roleActionCreators,
    initialize: props.initialize,
    itemAdapter: ({ name, description, permissions, slug }) => ({
      name,
      description,
      permissions: map(permissions, ({ id }) => id),
      slug,
    }),
  });

  if (!formProps || !formProps.item) {
    return null;
  }

  return (
    <ModalForm
      {...props}
      {...formProps}
      formName={UPDATE_ROLE_FORM_NAME}
      submitText="Редактировать"
      submitting={submitting}
    />
  );
};

export default reduxForm({ form: UPDATE_ROLE_FORM_NAME })(UpdatingRoleForm);
