import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `currency/list`;

/**
 * @return {AxiosPromise}
 */
const loadCurrencyList = () => apiFetch(URL);

export default loadCurrencyList;
