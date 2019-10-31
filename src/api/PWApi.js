import axios from 'axios';

axios.defaults.baseURL = 'http://193.124.114.46:3001/';

export const authAPI = {
  registration(username, email, password){
    return axios.post(`users`, {username, email, password})
  },
  login(email, password){
    return axios.post(`sessions/create`, {email, password})
  }
};

export const userAPI = {
  profile(token){
    return axios.get(`api/protected/user-info`, token)
  },
  filter(filter){
    return axios.post(`api/protected/users/list`, {filter})
  }
};

export const TransactionAPI = {
  history(token){
    return axios.get(`api/protected/transactions`, token)
  },
  add(name, amount){
    return axios.post(`api/protected/transactions`, {name, amount})
  }
};
