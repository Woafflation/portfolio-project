import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const postbackPayloadLabels = { itemsLabel: `postbacks`, withPagination: true };

/**
 * @type {WidgetActionCreators}
 */
export const postbackActionCreators = widgetActionCreators({
  widget: WidgetType.POSTBACKS,
  labels: postbackPayloadLabels,
});
