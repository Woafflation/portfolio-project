import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `auth/logout`;

/**
 * @return {AxiosPromise}
 */
const logout = () => apiFetch(URL, { method: `POST` });

export default logout;
