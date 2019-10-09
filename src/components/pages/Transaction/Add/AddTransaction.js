import React from 'react';
import AddTransactionForm from './AddTransactionForm';
import {connect} from 'react-redux';
import {newTransaction} from '../../../../store/reducers/transaction-reducer';
import {getAuth} from '../../../../store/selectors';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';

const AddTransaction = (props) => {

  const onSubmit = (formData) => {
    props.newTransaction(formData)
  };

  return (
      <div className="transaction-page col-md-7 m-auto">
        <h1>Add transaction</h1>
        <p className="alert alert-light">Create a new transaction. Choose the recipient and specify the desired amount.</p>
        <AddTransactionForm onSubmit={onSubmit}/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  transaction: state.transaction
});

export default compose(
    connect(mapStateToProps, {newTransaction}),
    withAuthRedirect
)(AddTransaction);
