import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `proxy/list`;

/**
 * @return {AxiosPromise}
 */
const loadProxyList = () => apiFetch(URL);

export default loadProxyList;
