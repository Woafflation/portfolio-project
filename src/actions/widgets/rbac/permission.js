import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const permissionPayloadLabels = { itemsLabel: `permissions` };

/**
 * @type {WidgetActionCreators}
 */
export const permissionActionCreators = widgetActionCreators({
  widget: WidgetType.PERMISSIONS,
  labels: permissionPayloadLabels,
});
