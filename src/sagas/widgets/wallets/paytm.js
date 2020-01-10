import { takeEvery, put } from 'redux-saga/effects';
import { isObject, toNumber } from 'lodash';

import { WALLET_PAYTM_CODE_CONFIRMATION } from 'actionTypes';
import setWalletActiveRequest from 'api/wallet/setSmsCode';
import refreshSaga from 'sagas/effects/refreshSaga';
import { paytmActionCreators } from 'actions/widgets/wallets/paytm';

/**
 * @param {{
 *   wallet_identifier: string,
 *   sms_code: string,
 * }} payload
 * @returns {IterableIterator<>}
 */
function* paytmConfirmNumberSaga({ payload }) {
  if (!isObject(payload)) return null;
  const data = { ...payload, sms_code: toNumber(payload.sms_code) };
  yield refreshSaga({
    request: () => setWalletActiveRequest(data),
    onSuccess: function*() {
      yield put(paytmActionCreators.hideModal());
    },
  });
}

const paytmSagas = [
  takeEvery(WALLET_PAYTM_CODE_CONFIRMATION, paytmConfirmNumberSaga),
];

export default paytmSagas;
