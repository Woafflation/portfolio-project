import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `rbac/user/list-with-roles`;

/**
 * @return {AxiosPromise}
 */
const loadUserList = () => apiFetch(URL);

export default loadUserList;
