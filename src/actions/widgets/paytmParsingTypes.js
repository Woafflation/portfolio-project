import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const paytmParsingTypesPayloadLabels = { itemsLabel: `parsing_types`, withPagination: false };

/**
 * @type {WidgetActionCreators}
 */
export const paytmParsingTypesActionCreators = widgetActionCreators({
  widget: WidgetType.PAYTM_PARSING_TYPES,
  labels: paytmParsingTypesPayloadLabels,
});
