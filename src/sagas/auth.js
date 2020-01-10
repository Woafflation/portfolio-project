import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { stopSubmit } from 'redux-form';

import {
  AUTH_CHECK_REQUESTED,
  AUTH_CHECK_SUCCEEDED,
  AUTH_ERROR, CHANGE_PASSWORD_REQUESTED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED, LOGOUT_REQUESTED, LOGOUT_SUCCEEDED,
  SET_TOKEN,
} from 'actionTypes';
import login from 'api/auth/login';
import checkAuth from 'api/auth/checkAuth';
import { currencyActionCreators } from 'actions/widgets/currency';
import refreshSaga from 'sagas/effects/refreshSaga';
import changePassword from 'api/auth/changePassword';
import logout from 'api/auth/logout';
import { getErrorMessage } from 'utils';
import { LOGIN_FORM_NAME } from 'utils/constants';

function* fetchDataOnLogin() {
  yield put(currencyActionCreators.getList());
}

/**
 * @param {LoginFormData} payload
 * @return {IterableIterator<*>}
 */
function* loginSaga({ payload }) {
  try {
    /**
     * @type {LoginResponse}
     */
    const resp = yield call(login, payload);
    const { data } = resp;
    if (!data || !data.token || !data.user) {
      throw new Error(`Invalid response`);
    }
    const { user, token } = data;
    yield localStorage.setItem(`token`, token);
    yield put({ type: LOGIN_SUCCEEDED, payload: { token, user } });
    yield fetchDataOnLogin();
  } catch (e) {
    const errorMessage = yield getErrorMessage(e, { defaultValue: `Login failed` });
    yield put(stopSubmit(LOGIN_FORM_NAME, { _error: errorMessage }));
    yield put({ type: AUTH_ERROR, payload: e.message });
  }
}

function* authCheckSaga() {
  const token = yield localStorage.getItem(`token`);
  if (token) {
    yield put({ type: SET_TOKEN, payload: token });
    yield refreshSaga({
      request: () => checkAuth(),
      onSuccess: function*(resp) {
        const { data } = resp;
        if (!data || !data.user) {
          throw new Error(`Invalid response`);
        }
        yield put({ type: AUTH_CHECK_SUCCEEDED, payload: { user: data.user } });
        yield fetchDataOnLogin();
      },
      onError: function*(e) {
        yield put({ type: AUTH_ERROR, payload: e.message });
      },
    });
  } else {
    yield put({ type: AUTH_ERROR, payload: `No token` });
  }
}

function* changePasswordSaga({ payload }) {
  yield refreshSaga({
    request: () => changePassword(payload),
    onSuccess: function*() {
      yield toastr.success(`Успех`, `Пароль успешно обновлен`);
    },
    onError: function*() {
      yield toastr.error(`Ошибка`, `Пароль не был обновлен`);
    },
  });
}

function* logoutSaga() {
  yield refreshSaga({
    request: logout,
  });
  yield localStorage.removeItem(`token`);
  yield put({ type: LOGOUT_SUCCEEDED });
}

const authSagas = [
  takeEvery(LOGIN_REQUESTED, loginSaga),
  takeEvery(AUTH_CHECK_REQUESTED, authCheckSaga),
  takeEvery(CHANGE_PASSWORD_REQUESTED, changePasswordSaga),
  takeEvery(LOGOUT_REQUESTED, logoutSaga),
];

export default authSagas;
