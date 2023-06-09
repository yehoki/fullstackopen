import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

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
    payload: asObject(anecdote),
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

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      console.log(state, action);
      const id = action.payload.id;
      const anecdoteForChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteForChange,
        votes: anecdoteForChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    addAnecdote(state, action) {
      console.log(state, action);
      state.push(action.payload);
    },
  },
});

export const { addAnecdote, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
