import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useField } from './hooks';

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Router>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/create">
          Create new
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>

      <Routes>
        <Route path="/:id" element={<Anecdote anecdotes={props.anecdotes} />} />
        <Route
          path="/"
          element={
            <AnecdoteList
              anecdotes={props.anecdotes}
              notification={props.notification}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateNew
              setNotification={props.setNotification}
              addNew={props.addNew}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification === '' ? null : notification}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>Has {anecdote.votes} votes</p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
    props.setNotification(`A new anecdote ${content.value} created!`);
  };

  const inputOnly = (field) => {
    const { reset, ...inputItems } = field;
    return inputItems;
  };

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputOnly(content)} name="content" />
        </div>
        <div>
          author
          <input {...inputOnly(author)} name="author" />
        </div>
        <div>
          url for more info
          <input name="info" {...inputOnly(info)} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetFields}>reset</button>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const notificationSet = async (notificationText) => {
    setNotification(notificationText);
    await setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  console.log('Notification', notification, notification === '');
  return (
    <div>
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        setNotification={notificationSet}
        notification={notification}
      />
    </div>
  );
};

export default App;
