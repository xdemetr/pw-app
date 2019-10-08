import {TransactionAPI} from '../../api/PWApi';

const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';


let initialState = {
  list: null,
  loading: false
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

export const transactionsHistory = (token = localStorage.getItem('jwtToken')) => (dispatch) => {
  dispatch(transactionsRequested());
  TransactionAPI.history(token)
      .then(res => {
            dispatch(transactionsLoaded(res.data.trans_token));
          }
      )
};

export default transactionReducer;
