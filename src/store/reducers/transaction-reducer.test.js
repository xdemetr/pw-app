import transactionReducer, {
  transactionAddSuccess,
  transactionFilter,
  transactionsLoaded,
  transactionsRequested
} from './transaction-reducer';
import {getTransactions} from '../selectors';

let dummyState = {
  transaction: {
    list: [
      {
        id :165,
        date: "10/7/2019, 11:37:13 PM",
        username: "dd",
        amount: -24,
        balance: 476
      },
      {
        id :166,
        date: "10/7/2019, 11:37:13 PM",
        username: "dd",
        amount: 24,
        balance: 500
      },
      {
        id :167,
        date: "10/7/2019, 11:37:13 PM",
        username: "dd",
        amount:24,
        balance: 524
      },
    ],
    loading: false,
    filter: ''
  }
};

it('Transactions request', () => {
  let action = transactionsRequested();
  let newState = transactionReducer(dummyState, action);
  expect(newState.loading).toBe(true);
});

it('Transactions loaded', () => {
  let action = transactionsLoaded(dummyState.transaction.list);
  let newState = transactionReducer(dummyState, action);
  expect(newState.loading).toBe(false);
  expect(newState.list.length).toBe(3);
});

it('Filter income transactions', (filter = 'in') => {
  let action = transactionFilter(filter);
  let list = getTransactions(dummyState, filter);
  let newState = transactionReducer({list: list}, action);
  expect(newState.list.length).toBe(2);
  expect(newState.filter).toBe(filter);
});

it('Filter outgoing transactions', (filter = 'out') => {
  let action = transactionFilter(filter);
  let list = getTransactions(dummyState, filter);
  let newState = transactionReducer({list: list}, action);
  expect(newState.list.length).toBe(1);
  expect(newState.filter).toBe(filter);
});

it('Filter all transactions', (filterValue = '') => {
  let action = transactionFilter(filterValue);
  let list = getTransactions(dummyState, filterValue);
  let newState = transactionReducer({list: list}, action);
  expect(newState.list.length).toBe(3);
  expect(newState.filter).toBe(filterValue);
});

it('Add new transaction', () => {
  const newItem = {
    username: "dd",
    amount:-24,
  };

  let action = transactionAddSuccess(newItem);
  dummyState.transaction.list = [...dummyState.transaction.list, newItem];
  let newState = transactionReducer(dummyState, action);
  expect(newState.transaction.list.length).toBe(4);
});
