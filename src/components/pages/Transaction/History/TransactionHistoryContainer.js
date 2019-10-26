import React from 'react';
import TransactionHistory from './TransactionHistory';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {connect} from 'react-redux';
import {
  setTransactionPaginatorCurrent,
  setTransactionPaginatorList,
  transactionFilter,
  transactionsHistory
} from '../../../../store/reducers/transaction-reducer';
import {getAllTransactions, getTransactions} from '../../../../store/selectors';
import Spinner from '../../../Spinner';
import Paginator from '../../../Paginator/Paginator';

class TransactionHistoryContainer extends React.PureComponent {

  componentDidMount() {
    this.props.transactionsHistory();
    this.props.setTransactionPaginatorList(this.props.paginatorList);
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
    if (!this.props.paginatorList) {
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

          <div className="mb-4 d-flex align-items-center">
            <Paginator
                totalItemsCount={this.props.list.length}
                pageSize={this.props.pageSize}
                currentPage={this.props.paginatorCurrent}
                onPageChanged={this.props.setTransactionPaginatorCurrent}
            />
            <div className="btn-group ml-auto">{buttons}</div>
          </div>

          <TransactionHistory list={this.props.paginatorList}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: getAllTransactions(state, state.transaction.filter),
  filter: state.transaction.filter,
  pageSize: state.transaction.paginatorSize,
  paginatorList: getTransactions(state),
  paginatorCurrent: state.transaction.paginatorCurrent
});

const mapDispatchToProps = {
  transactionsHistory, transactionFilter,
  setTransactionPaginatorList, setTransactionPaginatorCurrent
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(TransactionHistoryContainer);
