import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `auth/login`;

/**
 * @param {LoginFormData} data
 * @return {AxiosPromise}
 */
const login = (data) => apiFetch(URL, { data, auth: false, method: `POST`, needRefresh: false });

export default login;
