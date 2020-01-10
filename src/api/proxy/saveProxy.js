import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `proxy/create`;

/**
 * @param {ProxyFormData} data
 * @return {AxiosPromise}
 */
const saveProxy = (data) => apiFetch(URL, { data, method: `POST` });

export default saveProxy;
