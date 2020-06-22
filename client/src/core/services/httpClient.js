import Axios from 'axios';

const httpClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  port: process.env.REACT_APP_API_PORT,
  responseType: 'json',
});

export default httpClient;
