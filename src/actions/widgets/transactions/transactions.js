import widgetActionCreators, { createWidgetAction } from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import {
  DOWNLOAD_TRANSACTION_CSV_LIST_FAILED,
  DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED,
  DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED,
} from 'actionTypes';
import { CREATE_TRANSACTION_FORM_NAME } from 'utils/constants';

/**
 * @type {WidgetLabels}
 */
export const transactionPayloadLabels = { itemsLabel: `transactions`, withPagination: true, itemLabel: `transaction` };

/**
 * @type {WidgetActionCreators}
 */
export const transactionActionCreators = widgetActionCreators({
  widget: WidgetType.TRANSACTIONS,
  labels: transactionPayloadLabels,
  createForm: CREATE_TRANSACTION_FORM_NAME,
});

export const downloadTransactionCSVListRequest = createWidgetAction({
  widget: WidgetType.TRANSACTIONS,
})(DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED);

export const downloadTransactionCSVListSuccess = createWidgetAction({
  widget: WidgetType.TRANSACTIONS,
})(DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED);

export const downloadTransactionCSVListFail = createWidgetAction({
  widget: WidgetType.TRANSACTIONS,
})(DOWNLOAD_TRANSACTION_CSV_LIST_FAILED);

export const transactionsOnlyByIdActionCreators = widgetActionCreators({
  widget: WidgetType.TRANSACTIONS_ONLY_BY_ID,
  labels: transactionPayloadLabels,
});
