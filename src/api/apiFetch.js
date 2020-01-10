import axios from 'axios';
import queryString from 'query-string';
import { assign, size } from 'lodash';

import { getUrlFromEnv } from 'utils';
import { tokenSelector } from 'selectors/auth';
import store from 'store';

/**
 * @typedef {import('axios/AxiosPromise')} AxiosPromise
 */

/**
 * @typedef {import('axios/AxiosRequestConfig')} AxiosRequestConfig
 */

/**
 * @param {string} url
 * @param {{
 *   ...AxiosRequestConfig,
 *   auth?: boolean,
 *   needRefresh?: boolean
 *   queryParams?: Object,
 * }} options
 * @return {AxiosPromise}
 */
const apiFetch = (url, options = {}) => {
  const { auth = true, queryParams = {}, needRefresh = true, ...axiosRequestConfig } = options;

  const _queryParams = { ...queryParams };

  options = {
    method: `GET`,
    headers: { 'Content-Type': `application/json` },
    baseURL: getUrlFromEnv(process.env.REACT_APP_API_URL),
    validateStatus: (status) => (status >= 200 && status < 300) || (needRefresh && status === 401),
    ...axiosRequestConfig,
  };

  if (auth) {
    const token = tokenSelector(store.getState()) || ``;
    assign(_queryParams, { token });
  }

  if (size(_queryParams) > 0) {
    url += `?${queryString.stringify(_queryParams)}`;
  }

  return axios(url, options);
};

export default apiFetch;
