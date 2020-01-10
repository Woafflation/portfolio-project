import React from 'react';
import PropTypes from 'prop-types';
import { formPropTypes, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import { modalFormPropTypes } from 'propTypes/widgets';
import { widgetModalSubmittingSelector } from 'selectors/widgets/widgets';
import { ModalType } from 'utils/enums';

import ModalForm from 'components/widgets/ModalForm';
import useUpdateWidgetForm from 'hooks/widgets/useUpdateWidgetForm';

const formWrapperPropTypes = {
  widget: PropTypes.string.isRequired,
  actionCreators: PropTypes.shape().isRequired,
};

const CreateForm = ({ actionCreators: { create }, widget, ...props }) => {
  const dispatch = useDispatch();
  const submitting = useSelector(widgetModalSubmittingSelector(widget)) || false;

  /**
   * @param {Object} values
   */
  const onSubmit = (values) => dispatch(create(values));

  return <ModalForm {...props} onSubmit={onSubmit} submitting={submitting} />;
};

CreateForm.propTypes = {
  ...formWrapperPropTypes,
  ...formPropTypes,
  ...modalFormPropTypes,

  fields: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const UpdateForm = ({ widget, actionCreators, itemAdapter, getFields, ...props }) => {
  const formProps = useUpdateWidgetForm({
    widget,
    getFields,
    actionCreators,
    initialize: props.initialize,
    itemAdapter,
  });

  if (!formProps || !formProps.item) {
    return null;
  }

  return <ModalForm {...props} {...formProps} />;
};

UpdateForm.propTypes = {
  ...formWrapperPropTypes,
  ...formPropTypes,
  ...modalFormPropTypes,

  getFields: PropTypes.func.isRequired,
  itemAdapter: PropTypes.func,
};

UpdateForm.defaultProps = {
  itemAdapter: (item) => item,
};

/**
 * @param {string} form
 * @param {WidgetModalForm} props
 * @param {ModalType} type
 * @return {React.ReactNode}
 */
const createForm = ({ form, props, type }) => {
  let Form = type === ModalType.UPDATE ? UpdateForm : CreateForm;
  Form = reduxForm({ form })(Form);

  return <Form {...props} formName={form} />;
};

export default createForm;
