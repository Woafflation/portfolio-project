import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `wallet/delete/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const deleteWallet = (id) => apiFetch(getUrl(id), { method: `DELETE` });

export default deleteWallet;
