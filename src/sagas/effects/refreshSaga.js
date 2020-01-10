import { call, select, put } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import refreshToken from 'api/auth/refreshToken';
import { refreshTokenRequest } from 'actions/auth';
import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCEEDED } from 'actionTypes';
import { refreshPromiseSelector } from 'selectors/auth';

/**
 * @param {function} request
 * @param {?function(e: Error): void} onError
 * @param {?function(resp: object): void} onSuccess
 *
 * @param {boolean} [redirectWhenNoPermissions=false]
 * @param {boolean} [callErrorWhenNoPermissions=false]
 * @param {boolean} [showToastrWhenNoPermissions=true]
 * @return {IterableIterator<*>}
 */
function* refreshSaga({
  request,
  onError,
  onSuccess,
  redirectWhenNoPermissions = false,
  callErrorWhenNoPermissions = false,
  showToastrWhenNoPermissions = true,
}) {
  const refreshPromise = yield select(refreshPromiseSelector);
  if (!refreshPromise) {
    let resp;
    try {
      resp = yield call(request);
      if (resp.status !== 401 && onSuccess) {
        yield call(onSuccess, resp);
      }
    } catch (e) {
      const status = get(e, `response.status`);
      if (status === 403) {
        if (redirectWhenNoPermissions) {
          yield put(replace(`/no-permissions`));
        } else if (showToastrWhenNoPermissions) {
          yield toastr.error(`Ошибка`, `Нет прав`);
        }

        if (callErrorWhenNoPermissions) {
          yield call(onError, e);
        }
      } else if (status !== 401 && onError) {
        yield call(onError, e);
      }
    }
    if (resp && resp.status === 401) {
      try {
        const promise = refreshToken();
        yield put(refreshTokenRequest(promise));
        const { data } = yield promise;
        yield put({ type: REFRESH_TOKEN_SUCCEEDED, payload: data });
        const resp = yield call(request);
        if (onSuccess) {
          yield call(onSuccess, resp);
        }
        yield localStorage.setItem(`token`, data.token);
      } catch (e) {
        if (onError) {
          yield call(onError, e);
        }
        yield put({ type: REFRESH_TOKEN_FAILED });
        yield put(push(`/login`));
        yield localStorage.removeItem(`token`);
      }
    }
  } else {
    try {
      yield refreshPromise;
      const resp = yield call(request);
      if (onSuccess) {
        yield call(onSuccess, resp);
      }
    } catch (e) {
      if (onError) {
        yield call(onError, e);
      }
      yield put(push(`/login`));
    }
  }
}

export default refreshSaga;
