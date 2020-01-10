import {
  DOWNLOAD_TRANSACTION_CSV_LIST_FAILED,
  DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED,
  DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED,
} from 'actionTypes';
import transaction from 'reducers/widgets/transaction';

const state = {
  csvLoading: false,
};

const { reducer } = transaction;

describe(`Transaction reducer`, () => {
  it(DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED, () => {
    expect(reducer(state, { type: DOWNLOAD_TRANSACTION_CSV_LIST_REQUESTED })).toEqual({ ...state, csvLoading: true });
  });

  it(DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED, () => {
    expect(reducer(state, { type: DOWNLOAD_TRANSACTION_CSV_LIST_SUCCEEDED })).toEqual({ ...state, csvLoading: false });
  });

  it(DOWNLOAD_TRANSACTION_CSV_LIST_FAILED, () => {
    expect(reducer(state, { type: DOWNLOAD_TRANSACTION_CSV_LIST_FAILED })).toEqual({ ...state, csvLoading: false });
  });
});
