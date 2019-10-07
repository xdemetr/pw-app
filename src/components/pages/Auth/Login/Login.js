import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from '../../../../store/reducers/auth-reducer';
import Error from '../../../Error';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../../../hoc';

const Login = (props) => {

  const onSubmit = ({email, password}) => {
    props.login(email, password)
  };

  if (props.auth.isAuth) {
    return <Redirect to={`/profile`} />
  }

  return (
      <div className="login-page col-md-6 m-auto">
        <h1>Login</h1>
        <Error message={props.auth.error} />
        <LoginForm onSubmit={onSubmit}/>
      </div>
  );
};

export default compose(
    connect(null, {login}),
    withAuthRedirect,
)(Login);
