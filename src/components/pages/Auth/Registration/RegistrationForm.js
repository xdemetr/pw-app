import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../Form/Input';
import {email, minValue, required} from '../../../../utils/validators';

const RegistrationForm = (props) => {

  const min6 = minValue(6);

  return (
      <form onSubmit={props.handleSubmit}>
        <Field
            validate={[required]}
            component={Input} placeholder="Name" name={"username"} />

        <Field
            validate={[required, email]}
            component={Input} placeholder="Email" name={"email"}/>

        <Field
            validate={[required, min6]}
            component={Input} placeholder="Password" name={"password"} type="password"/>

        <button className="btn btn-primary w-100">GO</button>
      </form>
  )
};

export default reduxForm({
  form: 'registration'
})(RegistrationForm);
