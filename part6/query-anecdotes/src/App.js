import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from 'react-query';
import { getAnecdotes } from './requests';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const result = useQuery('anecdotes', getAnecdotes);
  console.log(result);

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
    return (<div>
      There has been a problem loading your anecdotes
    </div>)
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
