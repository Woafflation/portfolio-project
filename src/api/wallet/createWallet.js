import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `wallet/create/`;

/**
 * @param {Object} data
 * @return {AxiosPromise}
 */
const createWallet = (data) => apiFetch(URL, { data, method: `POST` });

export default createWallet;
