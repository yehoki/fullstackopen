import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAnecdotes, editAnecdote } from './requests';
import {
  makeNotification,
  useNotificationDispatch,
} from './context/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(editAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const setNotification = useNotificationDispatch();

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    makeNotification(
      setNotification,
      `You voted for anecdote "${anecdote.content}"`
    );
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
  });

  if (result.isLoading) {
    return (
      <div
        style={{
          width: '100%',
          border: 'black solid 1px',
          textAlign: 'center',
          fontSize: 64,
        }}
      >
        Loading anecdotes...
      </div>
    );
  } else if (result.isError) {
    return <div>There has been a problem loading your anecdotes</div>;
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
