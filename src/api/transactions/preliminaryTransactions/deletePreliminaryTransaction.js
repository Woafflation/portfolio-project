import apiFetch from 'api/apiFetch';

/**
 * @param {number} id
 * @return {string}
 */
const getUrl = (id) => `pretransaction/delete/${id}`;

/**
 * @param {number} id
 * @return {AxiosPromise}
 */
const deletePreliminaryTransaction = (id) => apiFetch(getUrl(id), { method: `DELETE` });

export default deletePreliminaryTransaction;
