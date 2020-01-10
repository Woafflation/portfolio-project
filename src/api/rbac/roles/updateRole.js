import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/role/update/${id}`;

/**
 * @param {number} id
 * @param {Object} data
 * @return {AxiosPromise}
 */
const updateRole = (id, data) => apiFetch(getUrl(id), { method: `POST`, data });

export default updateRole;
