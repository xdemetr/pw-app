import React from 'react';
import TransactionHistory from './TransactionHistory';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {connect} from 'react-redux';
import {transactionsHistory} from '../../../../store/reducers/transaction-reducer';
import {getProfile, getTransactions} from '../../../../store/selectors';
import Spinner from '../../../Spinner';
import {Redirect} from 'react-router-dom';

class TransactionHistoryContainer extends React.Component {

  componentDidMount() {
    this.props.transactionsHistory();
  }

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to={`/login`} />
    }

    if (!this.props.transaction.list) {
      return <Spinner/>;
    }

    return (
        <TransactionHistory list={this.props.transaction.list} />
    );
  }
};

const mapStateToProps = (state) => ({
  auth: getProfile(state),
  transaction: getTransactions(state)
});

export default compose(
    connect(mapStateToProps, {transactionsHistory, getProfile}),
    withAuthRedirect
)(TransactionHistoryContainer);
