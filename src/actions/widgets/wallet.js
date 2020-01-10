import widgetActionCreators, { createWidgetAction } from 'actions/widgets/index';
import { WidgetType } from 'utils/enums';
import {
  CREATE_WALLET_FORM_NAME,
  UPDATE_WALLET_FORM_NAME,
} from 'utils/constants';
import { MARK_WALLET_AS_ACTIVE_REQUESTED, RESET_WALLET_SELECTION } from 'actionTypes';

/**
 * @type {WidgetLabels}
 */
export const walletPayloadLabels = { itemsLabel: `wallets`, itemLabel: `wallet` };

/**
 * @type {WidgetActionCreators}
 */
export const walletActionCreators = widgetActionCreators({
  widget: WidgetType.WALLETS,
  labels: walletPayloadLabels,
  updateForm: UPDATE_WALLET_FORM_NAME,
  createForm: CREATE_WALLET_FORM_NAME,
});

export const markWalletAsActive = createWidgetAction({ widget: WidgetType.WALLETS })(MARK_WALLET_AS_ACTIVE_REQUESTED);

/**
 * @param {{
 *   url: string,
 *   form: string,
 * }} payload
 * @returns {{payload: Object, type: string}}
 */
export const resetWalletSelection = (payload) => ({ type: RESET_WALLET_SELECTION, payload });
