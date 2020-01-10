import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `/wallet/load`;

/**
 * @param {Object} queryParams
 * @return {AxiosPromise}
 */
const loadWalletsLoad = (queryParams) => apiFetch(URL, { queryParams });

export default loadWalletsLoad;
