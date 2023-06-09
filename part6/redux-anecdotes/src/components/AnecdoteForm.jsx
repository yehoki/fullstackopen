import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(setNotification(`A new anecdote has been added: '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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
