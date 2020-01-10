import { takeEvery, put, select } from 'redux-saga/effects';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getLocation } from 'connected-react-router';

import {
  WIDGET_CREATE_REQUESTED,
  WIDGET_CREATE_SUCCEEDED,
  WIDGET_ITEM_FAILED,
  WIDGET_ITEM_REQUESTED,
  WIDGET_ITEM_SUCCEEDED,
  WIDGET_LIST_FAILED,
  WIDGET_LIST_REQUESTED,
  WIDGET_LIST_SUCCEEDED,
  WIDGET_REMOVE_REQUESTED,
  WIDGET_REMOVE_SUCCEEDED,
  WIDGET_RESET_MODAL,
  WIDGET_SET_MODAL_SUBMITTING_STATUS,
  WIDGET_LIST_ITEM_UPDATE_REQUESTED,
  WIDGET_LIST_ITEM_UPDATE_SUCCEEDED,
  WIDGET_ITEM_UPDATE_SUCCEEDED,
  WIDGET_ITEM_UPDATE_REQUESTED,
  WIDGET_SET_MODAL,
  WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING,
} from 'actionTypes';
import { ModalType, WidgetType } from 'utils/enums';
import { getErrorMessage, sleep } from 'utils';

import loadProxyList from 'api/proxy/loadProxyList';
import loadProxyItem from 'api/proxy/loadProxyItem';
import saveProxy from 'api/proxy/saveProxy';
import updateProxy from 'api/proxy/updateProxy';
import deleteProxy from 'api/proxy/deleteProxy';
import loadWalletList from 'api/wallet/loadWalletList';
import loadWalletItem from 'api/wallet/loadWalletItem';
import deleteWallet from 'api/wallet/deleteWallet';
import loadCurrencyList from 'api/currency/loadCurrencyList';
import updateWallet from 'api/wallet/updateWallet';
import createWallet from 'api/wallet/createWallet';
import refreshSaga from 'sagas/effects/refreshSaga';
import loadTransactionList from 'api/transactions/loadTransactionList';
import loadTransactionManagementList from 'api/transactions/possibleTransactions/loadTransactionList';
import loadPostbackList from 'api/postback/loadPostbackList';
import loadStockpilingList from 'api/stockpiling/loadStockpilingList';
import loadWalletsLoad from 'api/wallet/loadWalletsLoad';
import loadLogList from 'api/log/loadLogList';
import loadPluginParams from 'api/plugin/loadPluginParams';
import savePluginParams from 'api/plugin/savePluginParams';
import loadRoleList from 'api/rbac/roles/loadRoleList';
import createRole from 'api/rbac/roles/createRole';
import updateRole from 'api/rbac/roles/updateRole';
import deleteRole from 'api/rbac/roles/deleteRole';
import loadRoleItem from 'api/rbac/roles/loadRoleItem';
import loadUserList from 'api/rbac/users/loadUserList';
import loadUserItem from 'api/rbac/users/loadUserItem';
import createUser from 'api/rbac/users/createUser';
import updateUser from 'api/rbac/users/updateUser';
import deleteUser from 'api/rbac/users/deleteUser';
import loadPermissionList from 'api/rbac/permissions/loadPermissionList';
import loadDisabledWalletList from 'api/wallet/loadDisabledWalletList';
import loadPaytmParsingTypes from 'api/wallet/loadPaytmParsingTypes';
import formSubmissionError from 'sagas/effects/formSubmissionError';
import createFakeTransaction from 'api/transaction/createFakeTransaction';
import loadPreliminaryTransactions from 'api/transactions/preliminaryTransactions/loadPreliminaryTransactions';
import createPreliminaryTransactions from 'api/transactions/preliminaryTransactions/createPreliminaryTransaction';
import deletePreliminaryTransaction from 'api/transactions/preliminaryTransactions/deletePreliminaryTransaction';
import { widgetFieldSelector } from 'selectors/widgets/widgets';

const defaultFetching = () => () => {};

/**
 * @param {WidgetType} widget
 * @param {string} route
 * @return {function(): AxiosPromise|function}
 */
const getFetchingListData = (widget, { route }) => {
  switch (widget) {
    case WidgetType.PROXIES:
      return loadProxyList;
    case WidgetType.WALLETS:
      if (route === `/disabled-wallets`) {
        return loadDisabledWalletList;
      }

      return loadWalletList;
    case WidgetType.CURRENCIES:
      return loadCurrencyList;
    case WidgetType.TRANSACTIONS:
    case WidgetType.TRANSACTIONS_ONLY_BY_ID:
      return loadTransactionList;
    case WidgetType.POSSIBLE_TRANSACTIONS:
      return loadTransactionManagementList;
    case WidgetType.PRELIMINARY_TRANSACTIONS:
      return loadPreliminaryTransactions;
    case WidgetType.STOCKPILING_LIST:
      return loadStockpilingList;
    case WidgetType.POSTBACKS:
      return loadPostbackList;
    case WidgetType.WALLETS_LOAD:
      return loadWalletsLoad;
    case WidgetType.LOGS:
      return loadLogList;
    case WidgetType.ROLES:
      return loadRoleList;
    case WidgetType.USERS:
      return loadUserList;
    case WidgetType.PERMISSIONS:
      return loadPermissionList;
    case WidgetType.PAYTM_PARSING_TYPES:
      return loadPaytmParsingTypes;
    default:
      return defaultFetching;
  }
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {Object} payload?
 * @return {IterableIterator<*>}
 */
function* getListSaga({ meta, payload }) {
  if (meta.statusBar) {
    yield put(showLoading());
  }
  const location = yield select(getLocation);
  yield refreshSaga({
    request: () => getFetchingListData(meta.widget, { route: get(location, `pathname`) })(payload),
    onSuccess: function*(resp) {
      yield put({ type: WIDGET_LIST_SUCCEEDED, meta, payload: resp.data });
    },
    onError: function*(e) {
      const payload = getErrorMessage(e, { normalize: true, defaultValue: `Fetching list failed` });
      yield put({ type: WIDGET_LIST_FAILED, meta, payload });
    },
  });
  if (meta.statusBar) {
    yield put(hideLoading());
  }
}

/**
 * @param {WidgetType} widget
 * @return {function(): AxiosPromise|function}
 */
const getFetchingItemData = (widget) => {
  switch (widget) {
    case WidgetType.PROXIES:
      return loadProxyItem;
    case WidgetType.WALLETS:
      return loadWalletItem;
    case WidgetType.PLUGIN:
      return loadPluginParams;
    case WidgetType.ROLES:
      return loadRoleItem;
    case WidgetType.USERS:
      return loadUserItem;
    default:
      return defaultFetching;
  }
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {number?} payload
 * @return {IterableIterator<*>}
 */
function* getItemSaga({ meta, payload }) {
  yield refreshSaga({
    request: () => getFetchingItemData(meta.widget)(payload),
    onSuccess: function*(resp) {
      yield put({ type: WIDGET_ITEM_SUCCEEDED, meta, payload: resp.data });
    },
    onError: function*(e) {
      const payload = getErrorMessage(e, { normalize: true, defaultValue: `Fetching item failed` });
      yield put({ type: WIDGET_ITEM_FAILED, meta, payload });
    },
  });
}

/**
 * @param {WidgetType} widget
 * @return {function(*): AxiosPromise|function}
 */
const getCreatingItem = (widget) => {
  switch (widget) {
    case WidgetType.PROXIES:
      return saveProxy;
    case WidgetType.WALLETS:
      return createWallet;
    case WidgetType.ROLES:
      return createRole;
    case WidgetType.USERS:
      return createUser;
    case WidgetType.TRANSACTIONS:
      return createFakeTransaction;
    case WidgetType.PRELIMINARY_TRANSACTIONS:
      return createPreliminaryTransactions;
    default:
      return defaultFetching;
  }
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {*} payload
 * @return {IterableIterator<*>}
 */
function* addItemSaga({ meta, payload }) {
  yield put({ type: WIDGET_SET_MODAL_SUBMITTING_STATUS, payload: true, meta });
  yield refreshSaga({
    request: () => getCreatingItem(meta.widget)(payload),
    onSuccess: function*(resp) {
      yield put({ type: WIDGET_CREATE_SUCCEEDED, meta, payload: resp.data });
      yield put({ type: WIDGET_RESET_MODAL, meta });
      yield toastr.success(`Успех`, `Успешно добавлено`);
      if (meta.successCreationCallback) meta.successCreationCallback(payload);
      const showCreationModal = yield select(widgetFieldSelector(meta.widget, `showCreationModalAfterCreating`));
      if (showCreationModal) {
        yield sleep(500);
        yield put({ type: WIDGET_SET_MODAL, payload: { type: ModalType.CREATE }, meta });
        yield put({ type: WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING, meta, payload: false });
      }
    },
    onError: function*(e) {
      const payload = yield getErrorMessage(e, { defaultValue: `Creating failed` });
      yield formSubmissionError({ payload, meta, formKey: `createForm` });
      yield put({ type: WIDGET_SHOW_CREATION_MODAL_AFTER_CREATING, meta, payload: false });
    },
  });
}

/**
 * @param {WidgetType} widget
 * @return {function(number, *): AxiosPromise|function}
 */
const getUpdatingListItem = (widget) => {
  switch (widget) {
    case WidgetType.PROXIES:
      return updateProxy;
    case WidgetType.WALLETS:
      return updateWallet;
    case WidgetType.ROLES:
      return updateRole;
    case WidgetType.USERS:
      return updateUser;
    default:
      return defaultFetching;
  }
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {{
 *   ...any,
 *   id: number,
 * }} payload
 * @return {IterableIterator<*>}
 */
function* updateListItemSaga({ meta, payload }) {
  yield put({ type: WIDGET_SET_MODAL_SUBMITTING_STATUS, payload: true, meta });
  const { id, ...formData } = payload;
  yield refreshSaga({
    request: () => getUpdatingListItem(meta.widget)(id, formData),
    onSuccess: function*(resp) {
      yield put({ type: WIDGET_LIST_ITEM_UPDATE_SUCCEEDED, meta, payload: resp.data });
      yield put({ type: WIDGET_RESET_MODAL, meta });
      yield toastr.success(`Успех`, `Данные успешно обновлены`);
    },
    onError: function*(e) {
      const payload = yield getErrorMessage(e, { defaultValue: `Updating failed` });
      yield formSubmissionError({ payload, meta, formKey: `updateForm` });
    },
  });
}

/**
 * @param {WidgetType} widget
 * @return {function(number, *): AxiosPromise|function}
 */
const getUpdatingItem = (widget) => {
  if (widget === WidgetType.PLUGIN) {
    return savePluginParams;
  }

  return defaultFetching;
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {Object} payload
 * @return {IterableIterator<*>}
 */
function* updateItemSaga({ meta, payload }) {
  yield refreshSaga({
    request: () => getUpdatingItem(meta.widget)(payload),
    onSuccess: function*(resp) {
      yield put({ type: WIDGET_ITEM_UPDATE_SUCCEEDED, meta, payload: resp.data });
      yield toastr.success(`Успех`, `Данные успешно обновлены`);
    },
    onError: function*(e) {
      const payload = yield getErrorMessage(e, { defaultValue: `Updating failed` });
      yield formSubmissionError({ payload, meta, formKey: `updateForm` });
    },
  });
}

/**
 * @param {WidgetType} widget
 * @return {function(number): AxiosPromise|function}
 */
const getRemovingItem = (widget) => {
  switch (widget) {
    case WidgetType.PROXIES:
      return deleteProxy;
    case WidgetType.WALLETS:
      return deleteWallet;
    case WidgetType.ROLES:
      return deleteRole;
    case WidgetType.USERS:
      return deleteUser;
    case WidgetType.PRELIMINARY_TRANSACTIONS:
      return deletePreliminaryTransaction;
    default:
      return defaultFetching;
  }
};

/**
 * @param {WidgetActionMetaData} meta
 * @param {number} payload
 * @return {IterableIterator<*>}
 */
function* removeItemSaga({ meta, payload }) {
  yield refreshSaga({
    request: () => getRemovingItem(meta.widget)(payload),
    onSuccess: function*() {
      yield put({ type: WIDGET_REMOVE_SUCCEEDED, meta, payload });
      yield toastr.success(`Успех`, `Данные успешно удалены`);
    },
    onError: function*(e) {
      yield toastr.error(`Ошибка`, e.message);
    },
  });
}

const widgetSagas = [
  takeEvery(WIDGET_LIST_REQUESTED, getListSaga),
  takeEvery(WIDGET_ITEM_REQUESTED, getItemSaga),
  takeEvery(WIDGET_CREATE_REQUESTED, addItemSaga),
  takeEvery(WIDGET_LIST_ITEM_UPDATE_REQUESTED, updateListItemSaga),
  takeEvery(WIDGET_ITEM_UPDATE_REQUESTED, updateItemSaga),
  takeEvery(WIDGET_REMOVE_REQUESTED, removeItemSaga),
];

export default widgetSagas;
