import { push } from 'connected-react-router';
import queryString from 'query-string';
import { each, isString, unset, assign, get, isNumber, size, pickBy, isObject } from 'lodash';
import moment from 'moment';

const convertDateToRequiredFormat = (date) => date ? moment(new Date(date)).format(`YYYY-MM-DD`) : null;

/**
 * @param {string} url
 * @param {{name: string, fromName: string, toName: string}[]} dateFields
 * @param {function[]} reduxCallbacks
 * @return {function(values: Object, dispatch: function): void}
 */
const getSubmitHandler = (url, { dateFields = [], reduxCallbacks = [] } = {}) => (values, dispatch) => {
  const data = pickBy(values, (value) => (
    isNumber(value) || (isString(value) && size(value) > 0) || isObject(value)
  ));
  each(dateFields, ({ name, fromName, toName }) => {
    if (isString(name) && isString(fromName) && isString(toName)) {
      const from = convertDateToRequiredFormat(get(data, `${name}.values.startDate`));
      const to = convertDateToRequiredFormat(get(data, `${name}.values.endDate`));
      if (from && to) {
        assign(data, { [fromName]: from, [toName]: to });
        unset(data, name);
      }
    }
  });

  dispatch(push(`${url}?${queryString.stringify(data)}`));

  each(reduxCallbacks, (callback) => {
    dispatch(callback());
  });
};

export default getSubmitHandler;
