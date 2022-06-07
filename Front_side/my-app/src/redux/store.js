import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {authenticationReducer} from './reducers';

const reducers = combineReducers({
    auth:authenticationReducer
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
