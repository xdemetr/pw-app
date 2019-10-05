import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from '../../../../store/reducers/auth-reducer';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Spinner';
import Error from '../../../Error';

const Login = (props) => {

  const onSubmit = ({email, password}) => {
    props.login(email, password)
  };

  if (props.auth.isAuth) {
    return <Redirect to={`/profile`}/>
  }

  if (props.auth.loading) {
    return <Spinner />
  }

  return (
      <div className="login-page col-md-6 m-auto">
        <h1>Login</h1>
        <Error message={props.auth.error} />
        <LoginForm onSubmit={onSubmit}/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {login})(Login);
