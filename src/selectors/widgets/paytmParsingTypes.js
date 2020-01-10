import { map } from 'lodash';
import { createSelector } from 'reselect';

import { widgetListSelector } from 'selectors/widgets/widgets';
import { WidgetType } from 'utils/enums';

export const paytmParsingTypesSelector = createSelector(
  widgetListSelector(WidgetType.PAYTM_PARSING_TYPES),
  (items) => map(items, (type) => ({ value: type, text: type })),
);
