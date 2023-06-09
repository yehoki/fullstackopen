import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import { LoginArea } from './components/LoginArea';
import loginService from './services/login';
import { LoginDisplay } from './components/LoginDisplay';
import { Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import { Togglable } from './components/Togglable';
import { Blogs } from './components/Blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [updateDOM, setUpdateDOM] = useState(0);

  const blogFormRef = useRef();

  useEffect(() => {
    async function getBlogs() {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    }
    getBlogs();
  }, [updateDOM]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exc) {
      setMessage('Incorrect username or password');
      setMessageType('error-message');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const handleBlogCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.createBlog(blogObject);
      setUpdateDOM(updateDOM + 1);
      setMessage(`Added ${blogObject.title} by ${blogObject.author}`);
      setMessageType('add-message');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } catch (exc) {
      setMessage(exc.response.data.error);
      setMessageType('error-message');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  const addLike = async (id, newObject) => {
    try {
      await blogService.update(id, newObject);
      setUpdateDOM(updateDOM + 1);
    } catch (exc) {
      console.log(exc.response.data.error);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setUpdateDOM(updateDOM + 1);
    } catch (exc) {
      console.log(exc);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Blog App</h1>
      {message === '' ? (
        <></>
      ) : (
        <Notification className={messageType} message={message} />
      )}
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginArea
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <LoginDisplay name={user.name} onClick={handleLogout} blogs={blogs} />
          <Togglable id='new-blog-toggle' buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm addBlog={handleBlogCreate} />
          </Togglable>
          <Blogs
            blogs={blogs}
            addLike={addLike}
            removeBlog={removeBlog}
            currentUser={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
