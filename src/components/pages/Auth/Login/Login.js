import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from '../../../../store/reducers/auth-reducer';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {getAuth} from '../../../../store/selectors';

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
        <LoginForm onSubmit={onSubmit}/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state)
});

export default compose(
    connect(mapStateToProps, {login})
)(Login);
