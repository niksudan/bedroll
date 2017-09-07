import * as React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './redux';
import { authenticate, getTodos } from './redux/actions';
import Wrapper from './components/Wrapper';
import './scss/style.scss';

store.dispatch(authenticate()).then((accountID) => {
  store.dispatch(getTodos(accountID));
})

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Wrapper />
  </Provider>
, app);
