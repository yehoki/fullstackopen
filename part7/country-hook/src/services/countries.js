import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = async () => {
  const res = await axios.get(`${baseUrl}/all`);
  return res.data;
};

const getOne = async (country) => {
  try {
    const res = await axios.get(`${baseUrl}/${country}`);
    return res.data;
  } catch (exc) {
    console.log(exc);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getOne,
};
