import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createAnecdote = async (newAnecdote) => {
  try {
    const res = await axios.post(baseUrl, newAnecdote);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editAnecdote = async (newAnecdote) => {
  try {
    const res = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
