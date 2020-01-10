import { map } from 'lodash';

import { MARK_WALLET_AS_ACTIVE_SUCCEEDED } from 'actionTypes';
import { WalletStatus } from 'utils/enums';

const actionTypes = new Set([MARK_WALLET_AS_ACTIVE_SUCCEEDED]);

/**
 * @param {Object} state
 * @param {string} type
 * @param {*} payload
 * @return {Object}
 */
const reducer = (state, { type, payload }) => {
  if (type === MARK_WALLET_AS_ACTIVE_SUCCEEDED) {
    return {
      ...state,
      items: map(state.items, (item) => item.id === payload ? { ...item, status: WalletStatus.OK } : item),
    };
  }

  return state;
};

/**
 * @type {WidgetExtraData}
 */
const wallet = { actionTypes, reducer };

export default wallet;
