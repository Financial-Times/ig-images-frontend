import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import './styles/base.css';

import * as actions from './actions';
import config from './config';
import App from './components/App';
import getStore from './getStore';

const store = getStore();

store.dispatch(actions.startUp());

render(
  <Provider store={store}>
    <Router>
      <Security {...config.oidc}>
        {/* So that it works locally */}
        <Route path="/ig-images/implicit/callback" component={LoginCallback} />
        {/* So that it works when deployed */}
        <Route path="/implicit/callback" component={LoginCallback} />
        <SecureRoute path="/ig-images" component={App} />
        <SecureRoute path="/" exact component={App} />
      </Security>
    </Router>
  </Provider>,
  document.getElementById('app-container'),
);
