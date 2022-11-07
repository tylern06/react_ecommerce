import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middleWares = [logger];
// root-reducer

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  rootReducer,
  undefined, // inital state (used for testing)
  composeEnhancers
);
