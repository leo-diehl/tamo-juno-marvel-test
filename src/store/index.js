import { createStore, applyMiddleware, compose } from 'redux';

// Middleware
import thunk from 'redux-thunk';

import rootReducer from './reducers';

// Enabling the Redux chrome devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
