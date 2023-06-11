import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import {
  makeNotification,
  useNotificationDispatch,
} from '../context/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useNotificationDispatch();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    refetchOnWindowFocus: false,
    onSuccess: (newAnecdote) => {
      console.log('Success', newAnecdote);
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.invalidateQueries('anecdotes', anecdotes.concat(newAnecdote));
    },
    onError: () => {
      makeNotification(
        setNotification,
        `Too short anecdote, must have length 5 or more!`
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote', content);
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          makeNotification(setNotification, `You created "${content}"!`);
        },
        onError: () => {
          makeNotification(
            setNotification,
            `An error occurred: An anecdote must be at least 5 characters long, yours was: ${content.length}`
          );
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
