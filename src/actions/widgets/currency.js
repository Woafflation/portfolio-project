import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const currencyPayloadLabels = { itemsLabel: `currencies` };

/**
 * @type {WidgetActionCreators}
 */
export const currencyActionCreators = widgetActionCreators({
  widget: WidgetType.CURRENCIES,
  labels: currencyPayloadLabels,
});