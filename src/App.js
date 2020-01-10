import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';

import store from './store';
import history from './history';
import Root from 'routes/Root';

import GeneralModals from 'components/widgets/GeneralModals';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <>
        <Root />
        <GeneralModals />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </>
    </Router>
  </Provider>
);

export default App;
