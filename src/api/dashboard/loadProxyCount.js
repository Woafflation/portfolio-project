import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `dashboard/proxies-count`;

/**
 * @return {AxiosPromise}
 */
const loadProxyCount = () => apiFetch(URL);

export default loadProxyCount;
