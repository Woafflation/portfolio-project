import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `transaction/list-to-xls`;

/**
 * @param queryParams
 * @return {AxiosPromise}
 */
const downloadTransactionCSV = (queryParams) => apiFetch(URL, { queryParams, responseType: `blob` });

export default downloadTransactionCSV;
