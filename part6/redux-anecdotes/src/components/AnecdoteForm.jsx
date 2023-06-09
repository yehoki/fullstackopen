import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

import { newAnecdote } from '../reducers/anecdoteReducer';
export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(newAnecdote(content));
    dispatch(setNotification(`A new anecdote has been added: '${content}'`, 5));
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};
