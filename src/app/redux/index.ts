import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const rootReducer = combineReducers({
  app: reducer,
});

const enhancer = compose(applyMiddleware(thunkMiddleware));

export default createStore(rootReducer, {}, enhancer);
