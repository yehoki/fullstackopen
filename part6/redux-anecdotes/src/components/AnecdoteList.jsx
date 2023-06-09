import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByVotes, voteForAnecdote } from '../reducers/anecdoteReducer';
import {
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
    dispatch(voteForAnecdote(id));
    dispatch(setNotification(`You voted for '${content}'`, 5));
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
