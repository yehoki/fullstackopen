import { useEffect, useRef } from 'react';
import { LoginArea } from './components/LoginArea';
import { LoginDisplay } from './components/LoginDisplay';
import { Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import { Togglable } from './components/Togglable';
import { Blogs } from './components/Blogs';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/BlogReducer';
import { initializeUser } from './reducers/UserReducer';
import { useSelector } from 'react-redux';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    // setUser(null);
    // window.localStorage.removeItem('loggedBlogAppUser');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Blog App</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginArea />
        </Togglable>
      ) : (
        <div>
          <LoginDisplay onClick={handleLogout} />
          <Togglable
            id="new-blog-toggle"
            buttonLabel="Create new blog"
            ref={blogFormRef}
          >
            <BlogForm />
          </Togglable>
          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;
