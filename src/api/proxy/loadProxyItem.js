import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `proxy/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const loadProxyItem = (id) => apiFetch(getUrl(id));

export default loadProxyItem;
