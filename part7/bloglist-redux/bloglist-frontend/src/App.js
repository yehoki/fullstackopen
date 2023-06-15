/* eslint-disable no-unused-vars */
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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { Menu } from './components/Menu';
import { useState } from 'react';
import { initializeUsers } from './reducers/AllUsersReducer';
import { Home } from './components/Home';
const App = () => {
  const dispatch = useDispatch();

  // const [theme, setTheme] = useState()

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.users);
  const allBlogs = useSelector((state) => state.blog);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Blog App</h1>
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginArea />
        </Togglable>
      ) : (
        <div>
          <Menu
            allUsers={allUsers}
            innerRef={blogFormRef}
            allBlogs={allBlogs}
          />
        </div>
      )}
    </>
  );
};

export default App;
