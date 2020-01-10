import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `transaction/generate-fake/`;

/**
 * @param {Object} data
 * @return {AxiosPromise}
 */
const createFakeTransaction = (data) => apiFetch(URL, { data, method: `POST` });

export default createFakeTransaction;
