import {TransactionAPI, userAPI} from '../../api/PWApi';
import {getAuthUser} from './auth-reducer';
import {stopSubmit} from 'redux-form';

const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
const ADD_TRANSACTION_REQUEST = 'ADD_TRANSACTION_REQUEST';
const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';

const FILTER_TRANSACTION = 'FILTER_TRANSACTION';
const GET_RECEPIENT_REQUEST = 'GET_RECEPIENT_REQUEST';
const GET_RECEPIENT_SUCCESS = 'GET_RECEPIENT_SUCCESS';

let initialState = {
  list: null,
  loading: false,
  message: null,
  filter: 'all',
  recepients: [],
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

    case FILTER_TRANSACTION: {
      return {
        ...state,
        filter: action.payload
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

    default:
      return state;
  }
};

export const transactionsRequested = () => {
  return {
    type: GET_TRANSACTIONS_REQUEST
  }
};

export const transactionsLoaded = (transactions) => {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    payload: transactions
  }
};

export const transactionAddRequested = () => {
  return {
    type: ADD_TRANSACTION_REQUEST
  }
};

export const transactionAddSuccess = (data) => {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    payload: data
  }
};

export const transactionFilter = (filter = 'all') => {
  return {
    type: FILTER_TRANSACTION,
    payload: filter
  }
};

export const recepientsRequested = () => {
  return {
    type: GET_RECEPIENT_REQUEST,
  }
};

export const recepientsSuccess = recepients => {
  return {
    type: GET_RECEPIENT_SUCCESS,
    payload: recepients
  }
};

export const onSuggestionsFetchRequested = (filter) => async dispatch => {
  dispatch(recepientsRequested());

  const res = await userAPI.filter(filter.value);
  if (res.data.length > 0) {
    dispatch(recepientsSuccess(res.data));
  }
};

export const onSuggestionsClearRequested = () => dispatch => {
  //dispatch(recepientsSuccess([]));
};

export const transactionsHistory = (token = localStorage.getItem('jwtToken')) => async dispatch => {
  dispatch(transactionsRequested());
  const res = await TransactionAPI.history(token);
  dispatch(transactionsLoaded(res.data.trans_token));
};

export const newTransaction = ({name, amount}) => async dispatch => {
  dispatch(transactionAddRequested());

  const res = await TransactionAPI.add(name, amount)
      .catch(err => {
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
