import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `stockpiling/list`;

/**
 * @param queryParams
 * @return {AxiosPromise}
 */
const loadStockpilingList = (queryParams) => apiFetch(URL, { queryParams });

export default loadStockpilingList;
