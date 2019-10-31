export const getAuth = (state) => {
  return state.auth
};

export const getProfile = (state) => {
  return state.auth.profile
};

export const getAllTransactions = (state, filter) => {
  let list = state.transaction.list;
  if (!list) return null;

  switch(filter) {
    case 'in': {
      return list.filter((item) => item.amount > 0)
    }

    case 'out': {
      return list.filter((item) => item.amount < 0)
    }

    default:
      return  list
  }
};

export const getTransactions = (state) => {
  const pageCurrent = state.transaction.paginatorCurrent;
  const pageSize = state.transaction.paginatorSize;
  let list = state.transaction.list;

  if (!list) return null;
  list = getAllTransactions(state, state.transaction.filter);

  return list.slice(pageSize * pageCurrent - pageSize, pageSize * pageCurrent);
};

export const getRecepients = (state) => {
  return state.transaction.recepients
};