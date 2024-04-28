import axios from 'axios';

const nubank = axios.create({
  baseURL: 'https://prod-global-webapp-proxy.nubank.com.br/api/proxy',
});

export default nubank;
