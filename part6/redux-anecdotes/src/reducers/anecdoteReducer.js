import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'anecdotes/addAnecdote',
    payload: anecdote,
  };
};

export const addVote = (id) => {
  return {
    type: 'anecdotes/vote',
    payload: { id },
  };
};

export const sortByVotes = (arr) => {
  const arrForSort = [...arr];
  return arrForSort.sort((first, second) => {
    if (first.votes > second.votes) {
      return -1;
    } else if (first.votes < second.votes) {
      return 1;
    }
    return 0;
  });
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const saveAnecdote = await anecdoteService.create(anecdoteContent);
    dispatch(appendAnecdote(saveAnecdote));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getOne(id);
    const edittedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.edit(id, edittedAnecdote);
    dispatch(vote(edittedAnecdote));
  };
};

export default anecdoteSlice.reducer;
