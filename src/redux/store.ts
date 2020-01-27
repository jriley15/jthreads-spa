import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authState from "./reducers/authReducer";
import namespaceState from "./reducers/namespaceReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers({
    authState,
    namespaceState
  }),
  {},
  composeEnhancers(applyMiddleware(thunk))
);
