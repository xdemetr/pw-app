import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import AppHeader from '../AppHeader';
import {Login, Registration, AddTransaction} from '../pages';
import {withSuspense} from '../../hoc';

const ProfileContainer = React.lazy(() => import('../pages/Profile/ProfileContainer'));
const TransactionHistoryContainer = React.lazy(() => import('../pages/Transaction/History/TransactionHistoryContainer'));

const App = () => {
  return (
      <div className="app">
        <AppHeader/>
        <div className="container">
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/registration' render={() => <Registration/>}/>
          <Route path='/profile' render={withSuspense(ProfileContainer)}/>
          <Route path='/transaction-history' render={withSuspense(TransactionHistoryContainer)} />
          <Route path='/transaction-add' render={() => <AddTransaction/>} />
        </div>
      </div>
  );
};

export default App;
