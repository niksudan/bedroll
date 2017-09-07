import axios from 'axios';
import * as find from 'lodash.find';
import {
  THROW_ERROR,
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH,
  SET_ACCOUNT,
  REQUEST_TODOS, RECEIVE_TODOS, RESET_TODOS,
  RECEIVE_TOTAL_TODOS,
  UPDATE_TIMESTAMP,
} from './constants';

/**
 * Throw an application error
 * @param {String} data
 */
export const throwError = (data) => ({
  type: THROW_ERROR,
  data,
});

/**
 * Send the access token request
 */
const requestAccessToken = () => ({
  type: REQUEST_ACCESS_TOKEN,
});

/**
 * Receive the access token request
 * @param {Object} accessToken
 */
const receiveAccessToken = (accessToken) => ({
  type: RECEIVE_ACCESS_TOKEN,
  data: accessToken,
});

/**
 * Get the access token
 */
const getAccessToken = () => (
  async (dispatch) => {
    dispatch(requestAccessToken());
    const response = await axios.get(`token.json`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    dispatch(receiveAccessToken(response.data));
    return response;
  }
);

/**
 * Send the auth request
 */
const requestAuth = () => ({
  type: REQUEST_AUTH,
});

/**
 * Receive the auth request
 * @param {Object} auth
 */
const receiveAuth = (auth) => ({
  type: RECEIVE_AUTH,
  data: auth,
});

/**
 * Set the authenticated account
 * @param {Object} account
 */
const setAccount = (account) => ({
  type: SET_ACCOUNT,
  data: account,
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

/**
 * Send the todo fetch request
 */
export const requestTodos = () => ({
  type: REQUEST_TODOS,
});

/**
 * Receive the todo fetch request
 * @param {Array} items
 */
export const receiveTodos = (items) => ({
  type: RECEIVE_TODOS,
  data: items,
});

/**
 * Update the total number of todos
 * @param {Number} total
 */
const receiveTotalTodos = (total) => ({
  type: RECEIVE_TOTAL_TODOS,
  data: parseInt(total),
});

/**
 * Fetch new todos from Basecamp
 * @param {Object} accountID
 * @param {Number} page
 * @return {Array} todos
 */
export const fetchTodos = (accountID, page = 1) => (
  async (dispatch) => {
    const response = await axios.get(`https://3.basecampapi.com/${accountID}/projects/recordings.json?type=Todo&page=${page}`);
    if (response.status !== 200) {
      dispatch(throwError('Could not connect to Basecamp'));
      return;
    }
    dispatch(receiveTotalTodos(response.headers['x-total-count']));
    return response.data;
  }
);

/**
 * Reset the todos
 */
export const resetTodos = () => ({
  type: RESET_TODOS,
});

/**
 * Update the stored timestamp
 * @param {Date} date
 */
export const updateTimestamp = (date = new Date()) => ({
  type: UPDATE_TIMESTAMP,
  data: date,
});
