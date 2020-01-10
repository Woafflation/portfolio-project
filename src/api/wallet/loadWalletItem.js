import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `wallet/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const loadWalletItem = (id) => apiFetch(getUrl(id));

export default loadWalletItem;
