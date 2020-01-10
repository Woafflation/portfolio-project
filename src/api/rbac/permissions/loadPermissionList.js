import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `rbac/permission/list`;

/**
 * @return {AxiosPromise}
 */
const loadPermissionList = () => apiFetch(URL);

export default loadPermissionList;
