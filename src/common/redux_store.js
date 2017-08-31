import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

import modules from '../client/modules';

const createReduxStore = (initialState, client, routerMiddleware) => {
  const isClientFlag = routerMiddleware ? true : false;

  let middlewares = [client.middleware(), thunk];
  if (isClientFlag) {
    middlewares.push(routerMiddleware)
  }

  const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      router: routerReducer,
      form: formReducer,

      ...modules.reducers
    }),
    initialState, // initial state

    isClientFlag ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares)
  );

  return store;
};

export default createReduxStore;
