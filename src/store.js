import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { combineReducers } from 'redux';

import map from './map/map.reducer';
import mapstyle from './mapstyle-switcher/mapstyle-switcher.reducer';

const rootReducer = combineReducers({
  map,
  mapstyle
});

// 1. Setup store to use middleware (thunk) to create API calls.
// 2. Add redux-logger to middleware.
const middleware = [thunk];

let store;

if (process.env.NODE_ENV === 'development') {
  // 1. Add redux dev tools (development mode only).
  // 2. Create store composed of reducers and middleware.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
} else {
  // 1. Create store composed of reducers and middleware.
  store = createStore(rootReducer, applyMiddleware(...middleware));
}

export default store;
