import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxWebsocket from '@giantmachines/redux-websocket';
import { rootReducer } from './rootReducer';

const initialState = {};

const reduxWebsocketMiddleware = reduxWebsocket();
const middleware = [thunk, reduxWebsocketMiddleware];

/** Used for chrome web dev */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * The actual store for the app
 */
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
