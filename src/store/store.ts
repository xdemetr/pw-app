import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './reducers/auth-reducer';
import transactionReducer from './reducers/transaction-reducer';
import {reducer as formReducer} from 'redux-form';
import { AppActions } from '../types';
import thunk, { ThunkMiddleware } from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  transaction: transactionReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof reducers>

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
        composeEnhancers()
    )
);

export default store;
