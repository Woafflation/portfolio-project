import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `dashboard/wallets-balance`;

/**
 * @return {AxiosPromise}
 */
const loadWalletBalance = () => apiFetch(URL);

export default loadWalletBalance;
