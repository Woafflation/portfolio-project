import { takeEvery, put } from 'redux-saga/effects';
import { get, omit } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { replace } from 'connected-react-router';

import { DASHBOARD_DATA_REQUESTED, DASHBOARD_DATA_SUCCEEDED, DASHBOARD_LOADED_ALL_DATA } from 'actionTypes';
import loadTransactionsSumAndCount from 'api/dashboard/loadTransactionsSumAndCount';
import loadProxyCount from 'api/dashboard/loadProxyCount';
import loadWalletBalance from 'api/dashboard/loadWalletBalance';
import loadWalletCount from 'api/dashboard/loadWalletCount';
import refreshSaga from 'sagas/effects/refreshSaga';

const loadRequests = [
  loadTransactionsSumAndCount,
  loadProxyCount,
  loadWalletBalance,
  loadWalletCount,
];

function* dashboardSaga() {
  yield put(showLoading());
  for (const request of loadRequests) {
    let noAccessBreak = false;
    yield refreshSaga({
      request: () => request(),
      onSuccess: function*(resp) {
        yield put({ type: DASHBOARD_DATA_SUCCEEDED, payload: omit(resp.data, `status`) });
      },
      onError: function*(err) {
        const status = get(err, `response.status`);
        if (status === 403) {
          noAccessBreak = true;
          yield put(replace(`/wallets`));
        } else {
          yield toastr.error(`Ошибка`, `Данные для дашборда не были получены`);
        }
      },
      callErrorWhenNoPermissions: true,
      showToastrWhenNoPermissions: false,
    });

    if (noAccessBreak) {
      break;
    }
  }
  yield put({ type: DASHBOARD_LOADED_ALL_DATA });
  yield put(hideLoading());
}

const dashboardSagas = [
  takeEvery(DASHBOARD_DATA_REQUESTED, dashboardSaga),
];

export default dashboardSagas;
