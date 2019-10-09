import React from 'react';
import TransactionHistory from './TransactionHistory';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {connect} from 'react-redux';
import {transactionsHistory} from '../../../../store/reducers/transaction-reducer';
import {getProfile, getTransactions} from '../../../../store/selectors';
import Spinner from '../../../Spinner';

class TransactionHistoryContainer extends React.Component {

  componentDidMount() {
    this.props.transactionsHistory();
  }

  render() {
    if (!this.props.transaction) {
      return <Spinner/>;
    }

    return (
        <TransactionHistory list={this.props.transaction} />
    );
  }
};

const mapStateToProps = (state) => ({
  transaction: getTransactions(state)
});

export default compose(
    connect(mapStateToProps, {transactionsHistory, getProfile}),
    withAuthRedirect
)(TransactionHistoryContainer);
