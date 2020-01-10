import { get } from 'lodash';

import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';

/**
 * @type {WidgetLabels}
 */
export const walletsLoadPayloadLabels = { itemsLabel: `result` };

/**
 * @type {WidgetActionCreators}
 */
export const walletsLoadActionCreators = widgetActionCreators({
  widget: WidgetType.WALLETS_LOAD,
  labels: walletsLoadPayloadLabels,
  getExtraListPayload: (payload) => ({ currency_symbol: get(payload, `currency_symbol`) }),
});
