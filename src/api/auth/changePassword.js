import apiFetch from 'api/apiFetch';

const URL = `user/change-password`;

/**
 * @param {ChangePasswordFormData} data
 * @return {AxiosPromise}
 */
const changePassword = (data) => apiFetch(URL, { data, method: `POST` });

export default changePassword;
