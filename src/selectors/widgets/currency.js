import { createSelector } from 'reselect';
import { map } from 'lodash';

import { WidgetType } from 'utils/enums';
import { widgetListSelector } from 'selectors/widgets/widgets';

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, Object[]|null, ISelect[]|null>}
 */
export const currencySelectionSelector = createSelector(
  widgetListSelector(WidgetType.CURRENCIES),
  (items) => map(items, ({ code, symbol }) => ({ value: code, text: symbol })),
);

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, Object[]|null, ISelect[]|null>}
 */
export const currencyWithIdSelectionSelector = createSelector(
  widgetListSelector(WidgetType.CURRENCIES),
  (items) => map(items, ({ id, symbol, code }) => ({ value: id, text: symbol, extra: code })),
);
