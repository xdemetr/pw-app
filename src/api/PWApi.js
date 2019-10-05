import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://193.124.114.46:3001/',
});

export const authAPI = {
  registration(username, email, password){
    return instance.post(`users`, {username, email, password})
  },
  login(email, password){
    return instance.post(`sessions/create`, {email, password})
  }
};
