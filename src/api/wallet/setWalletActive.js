import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `wallet/set-active/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const setWalletActiveRequest = (id) => apiFetch(getUrl(id), { method: `POST` });

export default setWalletActiveRequest;
