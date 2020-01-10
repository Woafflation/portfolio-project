import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `rbac/user/add`;

/**
 * @param {Object} data
 * @return {AxiosPromise}
 */
const createUser = (data) => apiFetch(URL, { data, method: `POST` });

export default createUser;
