import { all } from 'redux-saga/effects';

import widgetSagas from 'sagas/widgets/widgets';
import authSagas from 'sagas/auth';
import proxySagas from 'sagas/widgets/proxy';
import walletSagas from 'sagas/widgets/wallet';
import dashboardSagas from 'sagas/dashboard';
import transactionSagas from 'sagas/widgets/transactions/transaction';
import paytmSagas from 'sagas/widgets/wallets/paytm';

export default function* rootSaga() {
  yield all([
    ...widgetSagas,
    ...authSagas,
    ...proxySagas,
    ...walletSagas,
    ...dashboardSagas,
    ...transactionSagas,
    ...paytmSagas,
  ]);
}
