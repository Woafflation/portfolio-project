import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetActionCreators}
 */
export const possibleTransactionActionCreators = widgetActionCreators({
  widget: WidgetType.POSSIBLE_TRANSACTIONS,
  labels: {
    itemsLabel: `transactions`,
    withPagination: true,
    itemLabel: `transaction`,
  },
});
