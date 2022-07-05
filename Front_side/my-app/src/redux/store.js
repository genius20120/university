import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authenticationReducer, notificationReducer } from "./reducers";

const reducers = combineReducers({
  auth: authenticationReducer,
  hasNotif: notificationReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
