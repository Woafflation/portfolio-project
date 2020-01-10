import { takeEvery, select, put } from 'redux-saga/effects';
import { DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED } from 'actionTypes';
import { getSearch } from 'connected-react-router';
import queryString from 'query-string';
import FileSaver from 'file-saver';
import { get } from 'lodash';

import downloadTransactionCSV from 'api/transactions/downloadTransactionCSV';
import { getErrorMessage } from 'utils';
import {
  downloadTransactionCSVListFail,
  downloadTransactionCSVListSuccess,
  transactionActionCreators,
} from 'actions/widgets/transactions/transactions';

function* downloadTransactionCSVList() {
  const search = yield select(getSearch);
  const searchParams = queryString.parse(search);
  try {
    const resp = yield downloadTransactionCSV(searchParams);
    const file = yield new Blob([get(resp, `data`)], {});
    yield FileSaver.saveAs(file, `transactions.xlsx`);
    yield put(downloadTransactionCSVListSuccess());
  } catch (e) {
    console.error(e);
    const message = yield getErrorMessage(e, { defaultValue: `Ошибка загрузки файла` });
    yield put(transactionActionCreators.setError(message));
    yield put(downloadTransactionCSVListFail());
  }
}

const transactionSagas = [
  takeEvery(DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED, downloadTransactionCSVList),
];

export default transactionSagas;
