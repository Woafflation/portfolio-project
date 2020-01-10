import { createSelector } from 'reselect';
import { map } from 'lodash';

import { WidgetType } from 'utils/enums';
import { widgetListSelector } from 'selectors/widgets/widgets';

/**
 * @param {WidgetType} widget
 * @return {OutputSelector<RootState, Object[]|null, ISelect[]|null>}
 */
export const permissionSelectionSelector = createSelector(
  widgetListSelector(WidgetType.PERMISSIONS),
  (items) => map(items, ({ id, name }) => ({ value: id, text: name })),
);