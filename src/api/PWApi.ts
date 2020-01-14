import axios from 'axios';
import ITransactionItem from '../types/ITransactionItem';

axios.defaults.baseURL = 'http://193.124.114.46:3001/';

interface filterResolve {
  data: [
    Array<{ id: number, name: string }[]>
  ]
}

interface registrationResolve {
  status: number,
  data: {
    id_token: string
  }
}

interface loginResolve extends registrationResolve {
}

interface transactionListResolve {
  data: {
    trans_token: ITransactionItem[]
  }
}

interface transactionAddResolve {
  status: number,
  data: {
    trans_token: ITransactionItem
  }
}

export const authAPI = {
  registration(username: string, email: string, password: string): Promise<registrationResolve> {
    return axios.post(`users`, {username, email, password})
  },
  login(email: string, password: string): Promise<loginResolve> {
    return axios.post(`sessions/create`, {email, password})
  }
};

export const userAPI = {
  profile(token: string) {
    return axios.get(`api/protected/user-info`)
  },
  filter(filter: string): Promise<filterResolve> {
    return axios.post(`api/protected/users/list`, {filter})
  }
};

export const TransactionAPI = {
  history(): Promise<transactionListResolve> {
    return axios.get(`api/protected/transactions`,)
  },
  add(name: string, amount: string): Promise<transactionAddResolve> {
    return axios.post(`api/protected/transactions`, {name, amount})
  }
};
