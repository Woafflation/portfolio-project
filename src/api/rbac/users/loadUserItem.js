import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `rbac/user/with-roles/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const loadUserItem = (id) => apiFetch(getUrl(id));

export default loadUserItem;
