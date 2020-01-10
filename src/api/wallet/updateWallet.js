import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `wallet/update/${id}`;

/**
 * @param {number} id
 * @param {ProxyFormData} data
 * @return {AxiosPromise}
 */
const updateWallet = (id, data) => apiFetch(getUrl(id), { data, method: `POST` });

export default updateWallet;
