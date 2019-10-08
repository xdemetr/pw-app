import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import AppHeader from '../AppHeader';
import {Login, Registration, ProfileContainer, TransactionHistoryContainer, AddTransaction} from '../pages';

const App = () => {
  return (
      <div className="app">
        <AppHeader/>

        <div className="container">
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/registration' render={() => <Registration/>}/>
          <Route path='/profile' render={() => <ProfileContainer/>}/>

          <Route path='/transaction-history' render={() => <TransactionHistoryContainer/>} />
          <Route path='/transaction-add' render={() => <AddTransaction/>} />
        </div>
      </div>
  );
};

export default App;
