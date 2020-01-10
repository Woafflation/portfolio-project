import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `auth/refresh`;

/**
 * @return {AxiosPromise}
 */
const refreshToken = () => apiFetch(URL, { method: `POST` });

export default refreshToken;
