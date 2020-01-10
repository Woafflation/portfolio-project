import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/role/delete/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const deleteRole = (id) => apiFetch(getUrl(id), { method: `DELETE` });

export default deleteRole;
