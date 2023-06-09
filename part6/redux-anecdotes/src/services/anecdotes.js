import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getOne = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data;
}

const create = async (anecdoteContent) => {
  const object = { content: anecdoteContent, votes: 0 };
  const res = await axios.post(baseUrl, object);
  console.log('object', res.data);
  return res.data;
};

const edit = async (id, anecdote) => {
  const res = await axios.put(`${baseUrl}/${id}`, anecdote);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, edit, getOne };
