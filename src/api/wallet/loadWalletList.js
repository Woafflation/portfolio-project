import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `/wallet/list`;

/**
 * @return {AxiosPromise}
 */
const loadWalletList = () => apiFetch(URL);

export default loadWalletList;
