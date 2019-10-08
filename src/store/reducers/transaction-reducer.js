import {TransactionAPI} from '../../api/PWApi';
import {getAuthUser} from './auth-reducer';
import {stopSubmit} from 'redux-form';

const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';
const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';

let initialState = {
  list: null,
  loading: false,
  message: null
};

const transactionReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

const transactionsRequested = () => {
  return {
    type: GET_TRANSACTIONS_REQUEST
  }
};

const transactionsLoaded = (transactions) => {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: transactions
  }
};

const transactionAddRequested = () => {
  return {
    type: ADD_TRANSACTION_REQUEST
  }
};

const transactionAddSuccess = (data) => {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    payload: data
  }
};

export const transactionsHistory = (token = localStorage.getItem('jwtToken')) => (dispatch) => {
  dispatch(transactionsRequested());
  TransactionAPI.history(token)
      .then(res => {
            dispatch(transactionsLoaded(res.data.trans_token));
          }
      )
};

export const newTransaction = ({name, amount}) => (dispatch) => {
  dispatch(transactionAddRequested());
  TransactionAPI.add(name, amount)
      .then(res => {
        if (res.status === 200){
          dispatch(transactionAddSuccess('Success'));
          dispatch(getAuthUser())
        }
      })
      .catch(err => {
        //debugger
        dispatch(stopSubmit('addTransaction',
            {_error: err.response.data}
        ));
        //dispatch(transactionAddError(err.response.data))
      })
};

export default transactionReducer;
