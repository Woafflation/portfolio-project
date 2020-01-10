import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `proxy/delete/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const deleteProxy = (id) => apiFetch(getUrl(id), { method: `DELETE` });

export default deleteProxy;
