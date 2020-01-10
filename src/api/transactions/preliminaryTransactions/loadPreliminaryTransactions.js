import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `pretransaction/list`;

/**
 * @param {Object} queryParams
 * @return {AxiosPromise}
 */
const loadPreliminaryTransactions = (queryParams) => apiFetch(URL, { queryParams });

export default loadPreliminaryTransactions;
