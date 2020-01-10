import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `pretransaction/new`;

/**
 * @param {Object} data
 * @return {AxiosPromise}
 */
const createPreliminaryTransaction = (data) => apiFetch(URL, { data, method: `POST` });

export default createPreliminaryTransaction;
