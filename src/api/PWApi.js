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
  profile(id_token){
    return axios.get(`api/protected/user-info`)
  }
};
