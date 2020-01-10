import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { CREATE_PRELIMINARY_TRANSACTION_FORM_NAME } from 'utils/constants';

/**
 * @type {WidgetActionCreators}
 */
export const preliminaryTransactionsActionCreators = widgetActionCreators({
  widget: WidgetType.PRELIMINARY_TRANSACTIONS,
  labels: {
    itemsLabel: `pretransactions`,
    withPagination: true,
    itemLabel: `pretransaction`,
  },
  createForm: CREATE_PRELIMINARY_TRANSACTION_FORM_NAME,
});
