import * as React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './redux';
import { getAccessToken, getAuth } from './redux/actions';
import Wrapper from './components/Wrapper';

store.dispatch(getAccessToken()).then(() => {
  store.dispatch(getAuth());
});

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Wrapper />
  </Provider>
, app);
