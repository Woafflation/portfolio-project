import { takeEvery, call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { PROXY_CHECK_FAILED, PROXY_CHECK_REQUESTED, PROXY_CHECK_SUCCEEDED } from 'actionTypes';
import checkProxy from 'api/proxy/checkProxy';
import refreshSaga from 'sagas/effects/refreshSaga';

/**
 * @param {number} payload
 * @param {WidgetActionMetaData} meta
 * @return {IterableIterator<*>}
 */
function* checkProxySaga({ payload, meta }) {
  yield refreshSaga({
    request: () => checkProxy(payload),
    onSuccess: function*(resp) {
      const status = yield call(get, resp, `data.status`);
      if (!status || status === `fail`) {
        throw new Error();
      }
      yield put({ type: PROXY_CHECK_SUCCEEDED, payload, meta });
    },
    onError: function*(e) {
      yield put({ type: PROXY_CHECK_FAILED, payload, meta });
      yield toastr.error(`Ошибка`, e.message);
    },
  });
}

const proxySagas = [
  takeEvery(PROXY_CHECK_REQUESTED, checkProxySaga),
];

export default proxySagas;
