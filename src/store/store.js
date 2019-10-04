import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './reducers/auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
  auth: authReducer,
  form: formReducer
});

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;