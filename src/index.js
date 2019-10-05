import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store/store';
import {BrowserRouter} from 'react-router-dom';
import setAuthToken from './utils/set-auth-token';
import jwtDecode from 'jwt-decode';
import {logout, userLoaded} from './store/reducers/auth-reducer';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(userLoaded(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>, document.getElementById('app'));

