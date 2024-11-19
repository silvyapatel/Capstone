import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

const createAccount = (account) => {
  const token = localStorage.getItem('token');  // Get auth token from localStorage
  return axios.post(API_URL, account, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getAccountsByUserId = (userId) => {
  const token = localStorage.getItem('token');  // Get auth token from localStorage
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getAccountByAccNum = (accountNumber) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/${accountNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const deleteAccount = (accountNumber) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/${accountNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  createAccount,
  getAccountsByUserId,
  getAccountByAccNum,
  deleteAccount,
};
