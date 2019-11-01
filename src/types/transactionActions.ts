import ITransactionItem from './ITransactionItem';
import IRecepient from './IRecepient';

export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';

export const FILTER_TRANSACTION = 'FILTER_TRANSACTION';
export const GET_RECEPIENT_REQUEST = 'GET_RECEPIENT_REQUEST';
export const GET_RECEPIENT_SUCCESS = 'GET_RECEPIENT_SUCCESS';

export const SET_TRANSACTION_PAGINATOR_LIST = 'SET_TRANSACTION_PAGINATOR_LIST';
export const SET_TRANSACTION_PAGINATOR_CURRENT = 'SET_TRANSACTION_PAGINATOR_CURRENT';

export interface transactionsRequested {
  type: typeof GET_TRANSACTIONS_REQUEST
}

export interface transactionsLoaded {
  type: typeof GET_TRANSACTIONS_SUCCESS,
  transactions: ITransactionItem[]
}

export interface transactionAddRequested {
  type: typeof ADD_TRANSACTION_REQUEST
}

export interface transactionAddSuccess {
  type: typeof ADD_TRANSACTION_SUCCESS,
  data: ITransactionItem
}

export interface transactionFilter {
  type: typeof FILTER_TRANSACTION,
  filter: string
}

export interface recepientsRequested {
  type: typeof GET_RECEPIENT_REQUEST,
}

export interface recepientsSuccess {
  type: typeof GET_RECEPIENT_SUCCESS,
  recepients: IRecepient[]
}

export interface setTransactionPaginatorList {
  type: typeof SET_TRANSACTION_PAGINATOR_LIST,
  list:ITransactionItem[]
}

export interface setTransactionPaginatorCurrent {
  type: typeof SET_TRANSACTION_PAGINATOR_CURRENT,
  current:number
}

export type TransactionActionTypes =
    | transactionsRequested
    | transactionsLoaded
    | transactionAddRequested
    | transactionAddSuccess
    | transactionFilter
    | recepientsRequested
    | recepientsSuccess
    | setTransactionPaginatorList
    | setTransactionPaginatorCurrent
