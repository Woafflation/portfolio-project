import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `/wallet/list-disabled-wallets`;

/**
 * @return {AxiosPromise}
 */
const loadDisabledWalletList = () => apiFetch(URL);

export default loadDisabledWalletList;
