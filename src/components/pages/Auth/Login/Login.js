import React from 'react';
import LoginForm from './LoginForm';

const Login = (props) => {

  const onSubmit = (formData) => {
    console.log(formData)
  };

  return (
      <div className="login-page col-md-6 m-auto">
        <h1>Login</h1>
        <LoginForm onSubmit={onSubmit}/>
      </div>
  );
};

export default Login;
