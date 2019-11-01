import React,{useEffect} from 'react';
import TransactionHistory from './TransactionHistory';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';
import {connect} from 'react-redux';
// import {
//   setTransactionPaginatorCurrent,
//   setTransactionPaginatorList,
//   transactionFilter,
//   transactionsHistory
// } from '../../../../store/reducers/transaction-reducer';
import {getAllTransactions, getTransactions} from '../../../../store/selectors';
import Spinner from '../../../Spinner';
import Paginator from '../../../Paginator/Paginator';
import {
  setTransactionPaginatorCurrent,
  setTransactionPaginatorList,
  transactionFilter,
  transactionsHistory
} from '../../../../store/actions/transaction';

const TransactionHistoryContainer = (
    {
      transactionsHistory, transactionFilter, filter, list,
      setTransactionPaginatorCurrent, pageSize, paginatorCurrent, paginatorList
    }
) => {

  useEffect(() => {
    transactionsHistory();
  }, [transactionsHistory]);

  const onFilterChange = (filter) => {
    transactionFilter(filter);
  };

  const buttonsData = [
    {name: 'all', label: 'All'},
    {name: 'out', label: 'Outgoing payments'},
    {name: 'in', label: 'Income payments'},
  ];

  const buttons = buttonsData.map( ({name, label}) => {
    const isActive = filter === name;
    const classNames = isActive ? 'btn-info': 'btn-light';
    return (
        <span
            key={name} className={`btn ${classNames}`}
            onClick={() => onFilterChange(name)}
        >
            {label}
          </span>
    )
  });

  if (!paginatorList) {
    return <Spinner/>;
  }

  return (
      <div className="transaction-page">
        <h1>Transaction history</h1>

        <div className="mb-4 d-flex align-items-center">
          <Paginator
              totalItemsCount={list.length}
              pageSize={pageSize}
              currentPage={paginatorCurrent}
              onPageChanged={setTransactionPaginatorCurrent}
          />
          <div className="btn-group ml-auto">{buttons}</div>
        </div>

        <TransactionHistory list={paginatorList}/>
      </div>)
};

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
)(React.memo(TransactionHistoryContainer));
