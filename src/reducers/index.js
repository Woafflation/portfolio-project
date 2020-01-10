import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as toastrReducer } from 'react-redux-toastr';

import history from '../history';
import dashboard from './dashboard';
import { widgets } from 'reducers/widgets/widgets';
import { auth } from 'reducers/auth';

const appReducer = combineReducers({
  router: connectRouter(history),
  form: formReducer,
  loadingBar: loadingBarReducer,
  dashboard,
  widgets,
  auth,
  toastr: toastrReducer,
});

export default appReducer;
