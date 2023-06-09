import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote, sortByVotes } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return sortByVotes(state.anecdotes);
    }
    return sortByVotes(
      state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    );
  });

  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(setNotification(`You voted for '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
