import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @returns {string}
 */
const getUrl = (id) => `possible-transaction/get-image/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const loadTransactionImage = (id) => apiFetch(getUrl(id), { responseType: `blob` });

export default loadTransactionImage;
