import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const stockpilingListPayloadLabels = { itemsLabel: `stockpiling_list`, withPagination: true };

/**
 * @type {WidgetActionCreators}
 */
export const stockpilingListActionCreators = widgetActionCreators({
  widget: WidgetType.STOCKPILING_LIST,
  labels: stockpilingListPayloadLabels,
});
