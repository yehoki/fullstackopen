import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, update, setToken };
