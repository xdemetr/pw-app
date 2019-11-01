import { AppState } from '../store';
import ITransactionItem from '../../types/ITransactionItem';

export const getAuth = (state: AppState) => {
  return state.auth
};

export const getProfile = (state: AppState) => {
  return state.auth.profile
};

export const getAllTransactions = (state: AppState, filter?: string) => {
  let list:ITransactionItem[] | null = state.transaction.list;
  if (!list) return null;

  switch (filter) {
    case 'in': {
      return list.filter((item) => item.amount > 0)
    }

    case 'out': {
      return list.filter((item) => item.amount < 0)
    }

    default:
      return list
  }
};

export const getTransactions = (state: AppState) => {
  const pageCurrent: number = state.transaction.paginatorCurrent;
  const pageSize: number = state.transaction.paginatorSize;
  const list: ITransactionItem[] | null = state.transaction.list;

  if (list && list.length > 0) {
    return list.slice(pageSize * pageCurrent - pageSize, pageSize * pageCurrent);
  }
};

export const getRecepients = (state: AppState) => {
  return state.transaction.recepients
};
