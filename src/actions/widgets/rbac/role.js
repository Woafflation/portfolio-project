import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { CREATE_ROLE_FORM_NAME, UPDATE_ROLE_FORM_NAME } from 'utils/constants';

/**
 * @type {WidgetLabels}
 */
export const rolePayloadLabels = { itemsLabel: `roles`, itemLabel: `role` };

/**
 * @type {WidgetActionCreators}
 */
export const roleActionCreators = widgetActionCreators({
  widget: WidgetType.ROLES,
  labels: rolePayloadLabels,
  updateForm: UPDATE_ROLE_FORM_NAME,
  createForm: CREATE_ROLE_FORM_NAME,
});