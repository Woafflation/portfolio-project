import { isObject, map } from 'lodash';
import { stopSubmit, touch } from 'redux-form';
import { put } from 'redux-saga/effects';

import { WIDGET_SET_MODAL_ERROR, WIDGET_SET_MODAL_SUBMITTING_STATUS } from 'actionTypes';

/**
 * @param {WidgetActionMetaData} meta
 * @param {number} payload
 * @param {'createForm'|'updateForm'} formKey
 * @return {IterableIterator<*>}
 */
export default function* formSubmissionError({ payload, meta, formKey }) {
  if (isObject(payload)) {
    /**
     * @type {string[]}
     */
    const wrongFields = yield map(payload, (value, key) => key);

    yield put(touch(meta[formKey], ...wrongFields));
    yield put(stopSubmit(meta[formKey], payload));
  }

  yield put({ type: WIDGET_SET_MODAL_ERROR, meta, payload });
  yield put({ type: WIDGET_SET_MODAL_SUBMITTING_STATUS, payload: false, meta });
}
