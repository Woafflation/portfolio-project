import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `user/me`;

/**
 * @return {AxiosPromise}
 */
const checkAuth = () => apiFetch(URL);

export default checkAuth;
