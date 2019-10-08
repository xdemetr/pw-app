export const getAuth = (state) => {
  return state.auth
};

export const getProfile = (state) => {
  return state.auth.profile
};

export const getTransactions = (state) => {
  return state.transaction
};
