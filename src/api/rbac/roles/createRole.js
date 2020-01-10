import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `rbac/role/add`;

/**
 * @param {Object} data
 * @return {AxiosPromise}
 */
const createRole = (data) => apiFetch(URL, { data, method: `POST` });

export default createRole;
