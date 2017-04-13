import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import getStore from './getStore';
import * as actions from './actions';
import App from './components/App';

const { waitForCondition } = window.bootController;

waitForCondition('Polyfilled', async () => {
  const store = getStore();

  store.dispatch(actions.startUp());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-container'),
  );

  if (!document.documentElement) throw new Error('Unsupported'); // flow hack
  document.documentElement.classList.add('ready');
});
