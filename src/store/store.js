import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // only persist category
};
const sagaMiddleWare = createSagaMiddleWare();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleWare,
].filter(Boolean); // filter out falsey values,

// add redux dev tools to compose
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(
  applyMiddleware(...middleWares)
);

export const store = createStore(
  persistedReducer,
  undefined, // inital state (used for testing)
  composeEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
