import { createSelector } from 'reselect';
import { get } from 'lodash';

import { widgetSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

export const transactionCSVLoadingSelector = createSelector(
  widgetSelector(WidgetType.TRANSACTIONS),
  (transaction) => get(transaction, `csvLoading`) || false,
);
