import {
  THROW_ERROR,
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH,
  SET_ACCOUNT,
  REQUEST_TODOS, RECEIVE_TODOS, RESET_TODOS,
} from './constants';

const initialState = {
  isLoading: false,
  didInvalidate: false,
  error: '',
  accessToken: {},
  auth: {},
  account: {},
  items: [],
  total: 0,
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
    case REQUEST_TODOS:
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
    case SET_ACCOUNT:
      return Object.assign({}, state, {
        account: action.data,
      });
    case RESET_TODOS:
      return Object.assign({}, state, {
        items: [],
      });
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.data,
        total: action.total,
      });
    default:
      return state;
  }
};
