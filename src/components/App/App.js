import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import AppHeader from '../AppHeader';
import {Login, Registration} from '../pages';

const App = () => {
  return (
      <div className="app">
        <AppHeader/>

        <div className="container">
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/registration' render={() => <Registration/>}/>
        </div>
      </div>
  );
};

export default App;
