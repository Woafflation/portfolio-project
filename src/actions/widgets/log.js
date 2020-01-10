import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const logPayloadLabels = { itemsLabel: `logs`, withPagination: true };

/**
 * @type {WidgetActionCreators}
 */
export const logActionCreators = widgetActionCreators({
  widget: WidgetType.LOGS,
  labels: logPayloadLabels,
});
