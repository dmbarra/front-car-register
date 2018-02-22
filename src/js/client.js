var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'https://cars-api-register.herokuapp.com',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

module.exports = axiosInstance;
