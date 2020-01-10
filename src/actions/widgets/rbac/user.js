import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { CREATE_USER_FORM_NAME, UPDATE_USER_FORM_NAME } from 'utils/constants';

/**
 * @type {WidgetLabels}
 */
export const userPayloadLabels = { itemsLabel: `users`, itemLabel: `user` };

/**
 * @type {WidgetActionCreators}
 */
export const userActionCreators = widgetActionCreators({
  widget: WidgetType.USERS,
  labels: userPayloadLabels,
  updateForm: UPDATE_USER_FORM_NAME,
  createForm: CREATE_USER_FORM_NAME,
});
