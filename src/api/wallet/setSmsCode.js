import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `wallet/set-sms-code`;

/**
 * @param {{
 *   wallet_identifier: string,
 *   sms_code: number,
 * }} data
 * @return {AxiosPromise}
 */
const setWalletActiveRequest = (data) => apiFetch(URL, { method: `POST`, data });

export default setWalletActiveRequest;
