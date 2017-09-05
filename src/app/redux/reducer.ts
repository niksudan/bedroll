import {
  THROW_ERROR,
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH,
  RECEIVE_ACCOUNT,
} from './constants';

const initialState = {
  isLoading: false,
  didInvalidate: false,
  error: '',
  accessToken: {},
  auth: {},
  account: {},
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THROW_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        didInvalidate: true,
        error: action.data,
      });
    case REQUEST_ACCESS_TOKEN:
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RECEIVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        isLoading: false,
        accessToken: action.data,
      });
    case RECEIVE_AUTH:
      return Object.assign({}, state, {
        isLoading: false,
        auth: action.data,
      });
    case RECEIVE_ACCOUNT:
      return Object.assign({}, state, {
        isLoading: false,
        account: action.data,
      });
    default:
      return state;
  }
};
