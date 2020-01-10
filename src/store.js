import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';
import history from './history';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
