import axios from 'axios';
import * as find from 'lodash.find';
import {
  THROW_ERROR,
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH,
  SET_ACCOUNT,
  REQUEST_TODOS, RECEIVE_TODOS, RECEIVE_TOTAL_TODOS, RESET_TODOS,
} from './constants';

/**
 * Throw an application error
 * @param {String} data
 */
export const throwError = (data) => ({
  type: THROW_ERROR,
  data,
});

const requestAccessToken = () => ({
  type: REQUEST_ACCESS_TOKEN,
});

const receiveAccessToken = (data) => ({
  type: RECEIVE_ACCESS_TOKEN,
  data,
});

const getAccessToken = () => (
  async (dispatch) => {
    dispatch(requestAccessToken());
    const response = await axios.get(`token.json`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    dispatch(receiveAccessToken(response.data));
    return response;
  }
);

const requestAuth = () => ({
  type: REQUEST_AUTH,
});

const receiveAuth = (data) => ({
  type: RECEIVE_AUTH,
  data,
});

const setAccount = (data) => ({
  type: SET_ACCOUNT,
  data,
});

/**
 * Fetch authentication details
 * @return {int} accountID
 */
export const authenticate = () => (
  async (dispatch) => {
    await dispatch(getAccessToken());
    dispatch(requestAuth());
    const response = await axios.get('https://launchpad.37signals.com/authorization.json');
    if (response.status !== 200) {
      dispatch(throwError('Could not connect to authentication service'));
      return;
    }
    dispatch(receiveAuth(response.data));

    // Once we have the authentication details, we must find a valid BC3 account to get data from
    if (response.data.accounts.length < 0) {
      dispatch(throwError('You\'re not a member of any account'));
      return;
    }
    const account = find(response.data.accounts, { product: 'bc3' });
    if (account === undefined) {
      dispatch(throwError('You need to be a member of a Basecamp 3 account'));
      return;
    }
    dispatch(setAccount(account));
    return account.id;
  }
);

const requestTodos = () => ({
  type: REQUEST_TODOS,
});

const receiveTodos = (data) => ({
  type: RECEIVE_TODOS,
  data,
});

const receiveTotalTodos = (data) => ({
  type: RECEIVE_TOTAL_TODOS,
  data: parseInt(data),
});

/**
 * Fetch todos from Basecamp
 * @param {Object} accountID
 * @param {Number} page
 * @return {Array}
 */
export const getTodos = (accountID, page = 1) => (
  async (dispatch) => {
    dispatch(requestTodos());
    const response = await axios.get(`https://3.basecampapi.com/${accountID}/projects/recordings.json?type=Todo&page=${page}`);
    if (response.status !== 200) {
      dispatch(throwError('Could not connect to Basecamp'));
      return;
    }
    dispatch(receiveTotalTodos(response.headers['x-total-count']));
    dispatch(receiveTodos(response.data));
    return response.data;
  }
);

/**
 * Reset the Basecamp todos
 */
export const resetTodos = () => ({
  type: RESET_TODOS,
});
