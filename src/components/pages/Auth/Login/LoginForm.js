import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../Form/Input';
import {email, required} from '../../../../utils/validators';

const LoginForm = (props) => {

  return (
      <form onSubmit={props.handleSubmit}>

        <Field
            validate={[required, email]}
            component={Input} placeholder="Email" name={"email"}/>

        <Field
            validate={[required]}
            component={Input} placeholder="Password" name={"password"} type="password"/>

        <button className="btn btn-primary w-100">GO</button>
      </form>
  )
};

export default reduxForm({
  form: 'login'
})(LoginForm);

