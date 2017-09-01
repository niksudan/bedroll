import axios from 'axios';
import {
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH
} from './constants';

export const requestAccessToken = () => ({
  type: REQUEST_ACCESS_TOKEN,
});

export const receiveAccessToken = (data) => ({
  type: RECEIVE_ACCESS_TOKEN,
  data,
});

/**
 * Load the Basecamp access token from storage
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

/**
 * Load the Basecamp authentication details
 */
export const getAuth = () => (
  async (dispatch) => {
    dispatch(requestAuth());
    const response = await axios.get('https://launchpad.37signals.com/authorization.json');
    console.log(response.data);
    dispatch(receiveAuth(response.data));
    return response;
  }
);
