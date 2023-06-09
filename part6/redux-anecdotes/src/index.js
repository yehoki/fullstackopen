import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux-store/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

/*
    const anecdote = await anecdoteService.getOne(id);
    console.log(anecdote);
    const edittedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log(edittedAnecdote);
    const test = await anecdoteService.edit(id, edittedAnecdote);
    console.log(test);
    const anecdotes = await anecdoteService.getAll();
    console.log(anecdotes);
    dispatch(setAnecdotes(anecdotes)); */