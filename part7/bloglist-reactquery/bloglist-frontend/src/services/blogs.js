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

const update = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
    return res.data;
  } catch (exc) {
    throw new Error(exc);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (exc) {
    throw new Error(exc);
  }
};

export default { getAll, createBlog, update, setToken, deleteBlog };
