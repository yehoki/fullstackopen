import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import { LoginArea } from './components/LoginArea';
import loginService from './services/login';
import { LoginDisplay } from './components/LoginDisplay';
import { Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import { Togglable } from './components/Togglable';
import { Blogs } from './components/Blogs';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/NotificationReducer';
import { initializeBlogs } from './reducers/BlogReducer';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [updateDOM, setUpdateDOM] = useState(0);

  const blogFormRef = useRef();

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
      dispatch(
        setNotification('Incorrect username or password', 'error-message', 5)
      );
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
      dispatch(
        setNotification(
          `Added ${blogObject.title} by ${blogObject.author}`,
          'add-message',
          5
        )
      );
    } catch (exc) {
      dispatch(setNotification(exc.response.data.error, 'error-message', 5));
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
      <Notification />
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
          <LoginDisplay name={user.name} onClick={handleLogout} />
          <Togglable
            id="new-blog-toggle"
            buttonLabel="Create new blog"
            ref={blogFormRef}
          >
            <BlogForm addBlog={handleBlogCreate} />
          </Togglable>
          <Blogs
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
