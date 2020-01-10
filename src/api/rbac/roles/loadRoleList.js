import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `rbac/role/list-with-permissions-users`;

/**
 * @return {AxiosPromise}
 */
const loadRoleList = () => apiFetch(URL);

export default loadRoleList;
