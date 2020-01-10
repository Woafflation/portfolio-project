import {
  DOWNLOAD_TRANSACTION_CSV_LIST_FAILED,
  DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED, DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED,
} from 'actionTypes';

const actionTypes = new Set([
  DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED,
  DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED,
  DOWNLOAD_TRANSACTION_CSV_LIST_FAILED,
]);

/**
 * @param {Object} state
 * @param {string} type
 * @param {*} payload
 * @return {Object}
 */
const reducer = (state, { type }) => {
  switch (type) {
    case DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED:
      return { ...state, csvLoading: true };
    case DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED:
    case DOWNLOAD_TRANSACTION_CSV_LIST_FAILED:
      return { ...state, csvLoading: false };
    default:
      return state;
  }
};

/**
 * @type {WidgetExtraData}
 */
const transaction = { actionTypes, reducer };

export default transaction;
