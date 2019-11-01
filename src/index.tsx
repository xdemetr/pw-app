import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store/store';
import {BrowserRouter} from 'react-router-dom';
import setAuthToken from './utils/set-auth-token';
import JwtDecode from 'jwt-decode';
import ITokenJWT from './types/ITokenJWT';
import { logoutUser, userLoaded } from './store/actions/auth';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = JwtDecode<ITokenJWT>(localStorage.jwtToken);

  store.dispatch(userLoaded(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>, document.getElementById('app')
);
