import React from 'react';
import AddTransactionForm from './AddTransactionForm';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {getRecepients} from '../../../../store/selectors';
import {
  newTransaction,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested
} from '../../../../store/actions/transaction';

const AddTransaction = ({suggestions, onSuggestionsFetchRequested, onSuggestionsClearRequested, newTransaction}) => {

  const onSubmit = (formData) => {
    newTransaction(formData)
  };

  return (
      <div className="transaction-page col-md-7 m-auto">
        <h1>Add transaction</h1>
        <p className="alert alert-light">Create a new transaction. Choose the recipient and specify the desired amount.</p>
        <AddTransactionForm
            onSubmit={onSubmit}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
        />
      </div>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  suggestions: getRecepients(state)
});

export default compose(
    connect(mapStateToProps, {newTransaction, onSuggestionsFetchRequested, onSuggestionsClearRequested}),
    withAuthRedirect
)(AddTransaction);
