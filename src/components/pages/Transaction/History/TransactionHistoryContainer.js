import React from 'react';
import TransactionHistory from './TransactionHistory';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {connect} from 'react-redux';
import {transactionFilter, transactionsHistory} from '../../../../store/reducers/transaction-reducer';
import {getTransactions} from '../../../../store/selectors';
import Spinner from '../../../Spinner';

class TransactionHistoryContainer extends React.Component {

  componentDidMount() {
    this.props.transactionsHistory();
  }

  onClick = (filter) => {
    this.props.transactionFilter(filter);
  };

  render() {
    if (!this.props.transaction) {
      return <Spinner/>;
    }

    return (
        <div className="transaction-page">
          <h1>Transaction history</h1>
          <div className="btn-group mb-4">
            <span className="btn btn-info" onClick={() => this.onClick('all')}>All</span>
            <span className="btn btn-light" onClick={() => this.onClick('out')}>Outgoing payments</span>
            <span className="btn btn-light" onClick={() => this.onClick('in')}>Income payments</span>
          </div>
          <TransactionHistory list={this.props.transaction}/>
        </div>
    );
  }
};

const mapStateToProps = (state) => ({
  transaction: getTransactions(state, state.transaction.filter)
});

export default compose(
    connect(mapStateToProps, {transactionsHistory, transactionFilter}),
    withAuthRedirect
)(TransactionHistoryContainer);
