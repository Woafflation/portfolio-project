import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `proxy/check/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const checkProxy = (id) => apiFetch(getUrl(id), { method: `POST` });

export default checkProxy;
