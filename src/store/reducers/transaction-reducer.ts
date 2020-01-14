import ITransactionItem from '../../types/ITransactionItem';
import {
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  FILTER_TRANSACTION,
  GET_RECEPIENT_REQUEST,
  GET_RECEPIENT_SUCCESS,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  SET_TRANSACTION_PAGINATOR_CURRENT,
  SET_TRANSACTION_PAGINATOR_LIST,
  TransactionActionTypes
} from '../../types/transactionActions';
import IRecepient from '../../types/IRecepient';

interface transactionReducerState {
  list: ITransactionItem[] | null,
  loading: boolean,
  message?: string | null,
  filter: string,
  recepients: IRecepient[] | null,
  paginatorList: ITransactionItem[],
  paginatorSize: number,
  paginatorCurrent: number
}

const transactionReducerDefaultState:transactionReducerState = {
  list: null,
  loading: false,
  message: null,
  filter: 'all',
  recepients: null,
  paginatorList: [],
  paginatorCurrent: 1,
  paginatorSize: 10
};

const transactionReducer = (
    state = transactionReducerDefaultState,
    action:TransactionActionTypes
):transactionReducerState => {

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
        list: action.transactions,
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
        loading: false
      }
    }

    case FILTER_TRANSACTION: {
      return {
        ...state,
        filter: action.filter,
        paginatorCurrent: 1
      }
    }

    case GET_RECEPIENT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_RECEPIENT_SUCCESS: {
      return {
        ...state,
        recepients: action.recepients
      }
    }

    case SET_TRANSACTION_PAGINATOR_LIST: {
      return {
        ...state,
        paginatorList: action.list
      }
    }

    case SET_TRANSACTION_PAGINATOR_CURRENT: {
      return {
        ...state,
        paginatorCurrent: action.current
      }
    }

    default:
      return state;
  }
};

export default transactionReducer;
