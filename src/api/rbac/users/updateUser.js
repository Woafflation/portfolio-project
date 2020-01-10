import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/user/update/${id}`;

/**
 * @param {number} id
 * @param {Object} data
 * @return {AxiosPromise}
 */
const updateUser = (id, data) => apiFetch(getUrl(id), { method: `POST`, data });

export default updateUser;
