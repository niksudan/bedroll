import axios from 'axios';
import * as find from 'lodash.find';
import {
  THROW_ERROR,
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH,
  RECEIVE_ACCOUNT,
  REQUEST_TODOS, RECEIVE_TODOS,
} from './constants';

/**
 * Throw an application error
 * @param {String} data
 */
export const throwError = (data) => ({
  type: THROW_ERROR,
  data,
});

export const requestAccessToken = () => ({
  type: REQUEST_ACCESS_TOKEN,
});

export const receiveAccessToken = (data) => ({
  type: RECEIVE_ACCESS_TOKEN,
  data,
});

/**
 * Load Basecamp access token from storage
 * This is required for API calls
 */
export const getAccessToken = () => (
  async (dispatch) => {
    dispatch(requestAccessToken());
    const response = await axios.get(`token.json`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    dispatch(receiveAccessToken(response.data));
    return response;
  }
);

export const requestAuth = () => ({
  type: REQUEST_AUTH,
});

export const receiveAuth = (data) => ({
  type: RECEIVE_AUTH,
  data,
});

export const receiveAccount = (data) => ({
  type: RECEIVE_ACCOUNT,
  data,
});

/**
 * Load Basecamp authentication details
 * This is required for API calls
 */
export const getAuth = () => (
  async (dispatch) => {
    dispatch(requestAuth());
    const response = await axios.get('https://launchpad.37signals.com/authorization.json');
    dispatch(receiveAuth(response.data));

    if (response.data.accounts.length < 0) {
      dispatch(throwError('You\'re not a member of any account'));
      return;
    }

    const account = find(response.data.accounts, { product: 'bc3' });
    if (account === undefined) {
      dispatch(throwError('You need to be a member of a Basecamp 3 account'));
      return;
    }

    dispatch(receiveAccount(account));
    return response;
  }
);
