import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `dashboard/wallets-count`;

/**
 * @return {AxiosPromise}
 */
const loadWalletCount = () => apiFetch(URL);

export default loadWalletCount;
