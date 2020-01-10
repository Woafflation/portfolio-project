import widgetActionCreators, { createWidgetAction } from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { CREATE_PROXY_FORM_NAME, UPDATE_PROXY_FORM_NAME } from 'utils/constants';
import { PROXY_CHECK_REQUESTED } from 'actionTypes';

/**
 * @type {WidgetLabels}
 */
export const proxyPayloadLabels = { itemsLabel: `proxies`, itemLabel: `proxy` };

/**
 * @type {WidgetActionCreators}
 */
export const proxyActionCreators = widgetActionCreators({
  widget: WidgetType.PROXIES,
  labels: proxyPayloadLabels,
  updateForm: UPDATE_PROXY_FORM_NAME,
  createForm: CREATE_PROXY_FORM_NAME,
});

/**
 * @param {number} id
 * @return {IAction}
 */
export const checkProxyStatusRequest = createWidgetAction({ widget: WidgetType.PROXIES })(PROXY_CHECK_REQUESTED);
