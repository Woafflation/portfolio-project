import { takeEvery, call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import { initialize } from 'redux-form';

import {
  MARK_WALLET_AS_ACTIVE_FAILED,
  MARK_WALLET_AS_ACTIVE_REQUESTED,
  MARK_WALLET_AS_ACTIVE_SUCCEEDED, RESET_WALLET_SELECTION,
} from 'actionTypes';
import setWalletActiveRequest from 'api/wallet/setWalletActive';
import refreshSaga from 'sagas/effects/refreshSaga';
import { walletActionCreators } from 'actions/widgets/wallet';

/**
 * @param {number} payload
 * @param {WidgetActionMetaData} meta
 * @return {IterableIterator<*>}
 */
function* markWalletAsActiveSaga({ payload, meta }) {
  yield refreshSaga({
    request: () => setWalletActiveRequest(payload),
    onSuccess: function*(resp) {
      const status = yield call(get, resp, `data.status`);
      if (!status || status === `fail`) {
        throw new Error();
      }
      yield put({ type: MARK_WALLET_AS_ACTIVE_SUCCEEDED, payload, meta });
      yield put(walletActionCreators.hideModal());
      yield toastr.success(`Успех`, `Кошелек стал рабочим`);
    },
    onError: function*(e) {
      yield put({ type: MARK_WALLET_AS_ACTIVE_FAILED, meta });
      yield toastr.error(`Ошибка`, e.message);
    },
  });
}

/**
 * @param {string} url - route name
 * @param {string} form - form name
 * @returns {IterableIterator<*>}
 */
function* resetWalletSelection({ payload: { url, form } }) {
  yield put(push(url));
  yield put(initialize(form, {}));
}

const walletSagas = [
  takeEvery(MARK_WALLET_AS_ACTIVE_REQUESTED, markWalletAsActiveSaga),
  takeEvery(RESET_WALLET_SELECTION, resetWalletSelection),
];

export default walletSagas;
