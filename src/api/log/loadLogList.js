import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `log/list`;

/**
 * @param queryParams
 * @return {AxiosPromise}
 */
const loadLogList = (queryParams) => apiFetch(URL, { queryParams });

export default loadLogList;
