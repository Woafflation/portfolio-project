import apiFetch from 'api/apiFetch';

/**
 * @constant
 * @type {string}
 */
const URL = `/wallet/list-paytm-parsing-types`;

/**
 * @return {AxiosPromise}
 */
const loadPaytmParsingTypes = () => apiFetch(URL);

export default loadPaytmParsingTypes;
