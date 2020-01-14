import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../../Form/Input';
import {positiveNumber, required} from '../../../../utils/validators';
import Error from '../../../Error';

const AddTransactionForm = ({handleSubmit, error, suggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested}) => {

  return (
      <form onSubmit={handleSubmit}>
        <Error message={error} />

        <Field
            name={'name'}
            // component={AutoInput}
            component={Input}
            placeholder={'Recipient name'}
            autoComplete={"off"}
            validate={[required]}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            suggestions={suggestions}
        />

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

