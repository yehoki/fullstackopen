import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote, sortByVotes } from '../reducers/anecdoteReducer';

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => sortByVotes(state));

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
