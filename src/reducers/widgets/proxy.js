import { map } from 'lodash';

import { PROXY_CHECK_FAILED, PROXY_CHECK_REQUESTED, PROXY_CHECK_SUCCEEDED } from 'actionTypes';
import { ProxyStatus } from 'utils/enums';

const actionTypes = new Set([PROXY_CHECK_SUCCEEDED, PROXY_CHECK_FAILED, PROXY_CHECK_REQUESTED]);

/**
 * @param {Object} state
 * @param {ProxyStatus} status
 * @param {number} id
 * @return {Object}
 */
const setStatus = ({ state, status, id }) => ({
  ...state,
  items: map(state.items, (item) => item.id === id ? { ...item, status } : item),
});

/**
 * @param {Object} state
 * @param {string} type
 * @param {*} payload
 * @return {Object}
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case PROXY_CHECK_REQUESTED:
      return setStatus({ state, id: payload, status: ProxyStatus.CHECKING });
    case PROXY_CHECK_SUCCEEDED:
      return setStatus({ state, id: payload, status: ProxyStatus.SUCCESS });
    case PROXY_CHECK_FAILED:
      return setStatus({ state, id: payload, status: ProxyStatus.ERROR });
    default:
      return state;
  }
};

/**
 * @type {WidgetExtraData}
 */
const proxy = { actionTypes, reducer };

export default proxy;
