import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/role/with-permissions/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const loadRoleItem = (id) => apiFetch(getUrl(id));

export default loadRoleItem;
