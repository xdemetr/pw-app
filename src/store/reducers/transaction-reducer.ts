import {TransactionAPI, userAPI} from '../../api/PWApi';
import {getAuthUser} from './auth-reducer';
import {stopSubmit} from 'redux-form';
import ITransactionItem from '../../models/ITransactionItem';

const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';
const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';

const FILTER_TRANSACTION = 'FILTER_TRANSACTION';
const GET_RECEPIENT_REQUEST = 'GET_RECEPIENT_REQUEST';
const GET_RECEPIENT_SUCCESS = 'GET_RECEPIENT_SUCCESS';

const SET_TRANSACTION_PAGINATOR_LIST = 'SET_TRANSACTION_PAGINATOR_LIST';
const SET_TRANSACTION_PAGINATOR_CURRENT = 'SET_TRANSACTION_PAGINATOR_CURRENT';

let initialState = {
  list: null,
  loading: false,
  message: null,
  filter: 'all',
  recepients: [],
  paginatorList: null,
  paginatorSize: 10,
  paginatorCurrent: 1
};

interface ITransactions {
  list: Array<ITransactionItem>
}

interface baseAction {
  type: string,
  payload?: any
}

interface ITransactionAdd {
  name: string,
  amount: string
}

const transactionReducer = (state = initialState, action: baseAction) => {
  switch (action.type) {

    case GET_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    }

    case ADD_TRANSACTION_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case ADD_TRANSACTION_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        loading: false
      }
    }

    case FILTER_TRANSACTION: {
      return {
        ...state,
        filter: action.payload,
        paginatorCurrent: 1
      }
    }

    case GET_RECEPIENT_REQUEST: {
      return {
        ...state
      }
    }

    case GET_RECEPIENT_SUCCESS: {
      return {
        ...state,
        recepients: action.payload
      }
    }

    case SET_TRANSACTION_PAGINATOR_LIST: {
      return {
        ...state,
        paginatorList: action.payload
      }
    }

    case SET_TRANSACTION_PAGINATOR_CURRENT: {
      return {
        ...state,
        paginatorCurrent: action.payload
      }
    }

    default:
      return state;
  }
};

export const transactionsRequested = ():baseAction => {
  return {
    type: GET_TRANSACTIONS_REQUEST
  }
};

export const transactionsLoaded = (transactions: ITransactions):baseAction => {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: transactions
  }
};

export const transactionAddRequested = ():baseAction => {
  return {
    type: ADD_TRANSACTION_REQUEST
  }
};

export const transactionAddSuccess = (data: ITransactionItem | string):baseAction => {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    payload: data
  }
};

export const transactionFilter = (filter: string):baseAction => {
  return {
    type: FILTER_TRANSACTION,
    payload: filter
  }
};

export const recepientsRequested = ():baseAction => {
  return {
    type: GET_RECEPIENT_REQUEST,
  }
};
//export const recepientsSuccess = (recepients: Array<ITransactionItem>) => {

export const recepientsSuccess = (recepients:any):baseAction => {
  return {
    type: GET_RECEPIENT_SUCCESS,
    payload: recepients
  }
};

export const setTransactionPaginatorList = (list:Array<ITransactionItem>):baseAction => {
  return {
    type : SET_TRANSACTION_PAGINATOR_LIST,
    payload: list
  }
};

export const setTransactionPaginatorCurrent = (current:number):baseAction => {
  return {
    type : SET_TRANSACTION_PAGINATOR_CURRENT,
    payload: current
  }
};

export const onSuggestionsFetchRequested = (filter:any) => async (dispatch:any) => {
  dispatch(recepientsRequested());

  const res = await userAPI.filter(filter.value);
  if (res.data.length > 0) {
    dispatch(recepientsSuccess(res.data));
  }
};

export const onSuggestionsClearRequested = () => {
  //dispatch(recepientsSuccess([]));
};

export const transactionsHistory = (token = localStorage.getItem('jwtToken')) => async (dispatch:any) => {
  dispatch(transactionsRequested());
  const res = await TransactionAPI.history();
  dispatch(transactionsLoaded(res.data.trans_token));
};

export const newTransaction = (data:ITransactionAdd) => async (dispatch:any) => {
  dispatch(transactionAddRequested());

  const {name, amount} = data;

  const res = await TransactionAPI.add(name, amount)
      .catch((err:any) => {
        dispatch(stopSubmit('addTransaction',
            {_error: err.response.data}
        ));
      });
  if (res && res.status === 200) {
    dispatch(transactionAddSuccess('Success'));
    dispatch(getAuthUser())
  }
};

export default transactionReducer;
