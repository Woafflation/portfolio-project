import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `transaction/list`;

/**
 * @param {Object} queryParams
 * @return {AxiosPromise}
 */
const loadTransactionList = (queryParams) => apiFetch(URL, { queryParams });

export default loadTransactionList;
