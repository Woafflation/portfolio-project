import widgetActionCreators from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import { WALLET_PAYTM_CODE_CONFIRMATION } from 'actionTypes';

/**
 * @type {WidgetActionCreators}
 */
export const paytmActionCreators = widgetActionCreators({
  widget: WidgetType.WALLET_PAYTM,
});

/**
 * @param {Object} payload
 * @returns {{payload: Object, type: string}}
 */
export const paytmWalletConfirmation = (payload) => ({ type: WALLET_PAYTM_CODE_CONFIRMATION, payload });
