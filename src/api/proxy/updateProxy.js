import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `proxy/update/${id}`;

/**
 * @param {number} id
 * @param {ProxyFormData} data
 * @return {AxiosPromise}
 */
const updateProxy = (id, data) => apiFetch(getUrl(id), { data, method: `POST` });

export default updateProxy;
