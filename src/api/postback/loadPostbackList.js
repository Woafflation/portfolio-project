import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `postback/list`;

/**
 * @param queryParams
 * @return {AxiosPromise}
 */
const loadPostbackList = (queryParams) => apiFetch(URL, { queryParams });

export default loadPostbackList;
