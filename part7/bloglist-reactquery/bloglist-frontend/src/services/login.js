import axios from 'axios';
const baseUrl = '/api/login/';

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  console.log('resdata', res.data);
  return res.data;
};

export default { login };
