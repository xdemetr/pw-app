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

  onFilterChange = (filter) => {
    this.props.transactionFilter(filter);
  };

  buttons = [
    {name: 'all',label: 'All'},
    {name: 'out',label: 'Outgoing payments'},
    {name: 'in',label: 'Income payments'},
  ];

  render() {
    if (!this.props.transaction) {
      return <Spinner/>;
    }

    const buttons = this.buttons.map( ({name, label}) => {
      const isActive = this.props.filter === name;
      const classNames = isActive ? 'btn-info': 'btn-light';
      return (
          <span
              key={name} className={`btn ${classNames}`}
              onClick={() => this.onFilterChange(name)}
          >
            {label}
          </span>
      )
    });

    return (
        <div className="transaction-page">
          <h1>Transaction history</h1>
          <div className="btn-group mb-4">
            {buttons}
          </div>
          <TransactionHistory list={this.props.transaction}/>
        </div>
    );
  }
};

const mapStateToProps = (state) => ({
  transaction: getTransactions(state, state.transaction.filter),
  filter: state.transaction.filter
});

export default compose(
    connect(mapStateToProps, {transactionsHistory, transactionFilter}),
    withAuthRedirect
)(TransactionHistoryContainer);
