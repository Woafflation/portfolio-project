import {
  each,
  endsWith,
  get,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined, replace, round,
  size, split,
  startsWith,
  toNumber,
  toString,
} from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';

import { DATETIME_FORMAT } from './constants';

export const getTimeFromNow = (dt) => moment(dt, DATETIME_FORMAT).locale(`ru`).fromNow();

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const copyText = (ref) => {
  if (ref && ref.current) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand(`copy`);
  }
};

export const numInput = (value) => {
  value = value.replace(/[^\d]/g, ``);

  if (startsWith(value, `0`)) {
    value = value.slice(0, 1);
  }

  return value;
};

export const getUrlFromEnv = (url) => endsWith(url, `/`) ? url : `${url}/`;

/**
 * @param {KeyboardEvent} e
 * @returns {boolean}
 */
export const pressEsc = (e) => e.keyCode === 27;

/**
 * @param {Object|string} err
 * @return {string}
 */
export const normalizeErrorMessage = (err) => {
  if (isObject(err)) {
    let message = ``;

    each(err, (value, key) => {
      message += `${key}: ${value}\n`;
    });

    return message;
  }

  return err;
};

/**
 * @param {Error} err
 * @param {boolean} normalize
 * @param {string} defaultValue
 * @return {*}
 */
export const getErrorMessage = (err, { normalize = false, defaultValue = `` }) => {
  const message = get(err, `response.data.message`);

  if (!message) {
    return defaultValue;
  }

  return normalize ? normalizeErrorMessage(message) : message;
};

/**
 * @param {string|number} num
 * @param {boolean} splitFloatNumbers
 * @return {string|null}
 */
export const splitNumBySpaces = (num, { splitFloatNumbers = false } = {}) => {
  if (!isString(num) && !isNumber(num)) {
    return null;
  }

  const parts = num.toString().split(`.`);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
  if (splitFloatNumbers && parts[1]) {
    parts[1] = parts[1].replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
  }
  return parts.join(`.`);
};

/**
 * @param {number|string} balance
 * @param {boolean} [splitBySpaces=false]
 * @returns {string|null}
 */
export const getBalance = (balance, splitBySpaces = false) => {
  if (isNull(balance) || isUndefined(balance)) {
    return null;
  }

  if (!isNumber(balance)) {
    balance = toNumber(balance);
  }

  balance = round(balance, 2);
  balance = toString(balance);

  if (splitBySpaces) {
    balance = splitNumBySpaces(balance);
  }

  balance = replace(balance, `.`, `,`);
  const [, fraction] = split(balance, `,`, 2);
  if (!fraction) {
    balance += `,00`;
  } else if (size(fraction) === 1) {
    balance += `0`;
  }

  return balance;
};

/**
 * @param {string} startDate
 * @param {string} endDate
 * @return {{values: {endDate: string, startDate: string}}|undefined}
 */
export const getFilledDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return undefined;
  }

  return { values: { startDate: new Date(startDate), endDate: new Date(endDate) } };
};

export const displayingDateInputFormat = (date) => moment(new Date(date)).format(`DD-MM-YYYY`);
