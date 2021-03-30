import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './reducers'
import httpMiddleware from './middleware/httpMiddleware'

export const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, httpMiddleware)),
);
