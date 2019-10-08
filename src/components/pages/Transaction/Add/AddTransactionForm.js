import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../Form/Input';
import {positiveNumber, required} from '../../../../utils/validators';
import Error from '../../../Error';

const AddTransactionForm = (props) => {

  return (
      <form onSubmit={props.handleSubmit}>
        <Error message={props.error} />

        <Field
            validate={[required]}
            component={Input} placeholder="Recipient name" name={"name"} autoComplete={"off"} />

        <Field
            validate={[required, positiveNumber]}
            component={Input} placeholder="Amount" name={"amount"} autoComplete={"off"} />

        <button className="btn btn-primary w-100">Send</button>
      </form>
  )
};

export default reduxForm({
  form: 'addTransaction'
})(AddTransactionForm);

