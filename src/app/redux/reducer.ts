import {
  REQUEST_ACCESS_TOKEN, RECEIVE_ACCESS_TOKEN,
  REQUEST_AUTH, RECEIVE_AUTH
} from './constants';

const initialState = {
  isLoading: false,
  accessToken: {},
  auth: {},
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
