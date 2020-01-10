import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `dashboard/transactions-sum-and-count`;

/**
 * @return {AxiosPromise}
 */
const loadTransactionsSumAndCount = () => apiFetch(URL);

export default loadTransactionsSumAndCount;
