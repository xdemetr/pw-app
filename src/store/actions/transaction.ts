import {AppActions} from '../../types';
import {
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  FILTER_TRANSACTION,
  GET_RECEPIENT_REQUEST,
  GET_RECEPIENT_SUCCESS,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  SET_TRANSACTION_PAGINATOR_CURRENT,
  SET_TRANSACTION_PAGINATOR_LIST
} from '../../types/transactionActions';
import {Dispatch} from 'react';
import {TransactionAPI, userAPI} from '../../api/PWApi';
import {stopSubmit} from 'redux-form';
import ITransactionItem from '../../types/ITransactionItem';

const recepientsRequested = ():AppActions => ({
  type: GET_RECEPIENT_REQUEST
});

const recepientsSuccess = (recepients: Array<any>):AppActions => ({
  type: GET_RECEPIENT_SUCCESS,
  recepients
});

const transactionsRequested = ():AppActions => ({
  type: GET_TRANSACTIONS_REQUEST,
});

const transactionAddSuccess = (data:ITransactionItem):AppActions =>({
  type: ADD_TRANSACTION_SUCCESS,
  data
});

const transactionsLoaded = (transactions: ITransactionItem[]):AppActions => ({
  type: GET_TRANSACTIONS_SUCCESS,
  transactions,
});

const transactionAddRequested = ():AppActions => ({
  type: ADD_TRANSACTION_REQUEST
});

export const transactionFilter = (filter:string):AppActions => ({
  type: FILTER_TRANSACTION,
  filter
});

export const setTransactionPaginatorList = (list: ITransactionItem[]):AppActions => ({
  type: SET_TRANSACTION_PAGINATOR_LIST,
  list
});

export const setTransactionPaginatorCurrent = (current:number):AppActions => ({
  type: SET_TRANSACTION_PAGINATOR_CURRENT,
  current
});

export const onSuggestionsFetchRequested = (filter:any) => async (dispatch:Dispatch<AppActions>) => {
  dispatch(recepientsRequested());

  const res = await userAPI.filter(filter.value);
  if (res.data.length > 0) {
    dispatch(recepientsSuccess(res.data));
  }
};

export const onSuggestionsClearRequested = () => {
  //dispatch(recepientsSuccess([]));
};

export const transactionsHistory = () => async (dispatch:Dispatch<AppActions>) => {
  dispatch(transactionsRequested());
  const res = await TransactionAPI.history();
  dispatch(transactionsLoaded(res.data.trans_token));
};

export const newTransaction = (data:{name: string, amount: string}) => async (dispatch:Dispatch<AppActions>) => {
  dispatch(transactionAddRequested());

  const {name, amount} = data;

  const res = await TransactionAPI.add(name, amount)
      .catch((err:any) => {
        dispatch(stopSubmit('addTransaction',
            {_error: err.response.data}
        ));
      });
  if (res && res.status === 200) {
    dispatch(transactionAddSuccess(res.data.trans_token));
  }
};



