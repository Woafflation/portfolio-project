import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/user/delete/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const deleteUser = (id) => apiFetch(getUrl(id), { method: `DELETE` });

export default deleteUser;
