import React from 'react';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Users } from './users/Users';
import { Notification } from './Notification';
import { Home } from './Home';
import { User } from './users/User';
import { BlogView } from './blogs/BlogView';
import { LoginDisplay } from './LoginDisplay';
// import { useSelector } from 'react-redux';
// import { Togglable } from './Togglable';

export const Menu = (props) => {
  // const user = useSelector((state) => state.user);

  const paddingStyle = {
    padding: '0.5rem',
    border: '1px solid black',
    backgroundColor: 'lightgrey',
    borderRadius: '4px',
  };
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        <Link style={paddingStyle} to="/">
          Home
        </Link>
        <Link style={paddingStyle} to="/users">
          Users
        </Link>
        <LoginDisplay />
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Home ref={props.blogFormRef} />} />
        <Route
          path="/blogs/:id"
          element={<BlogView allBlogs={props.allBlogs} />}
        />
        <Route path="/users" element={<Users allUsers={props.allUsers} />} />
        <Route path="/users/:id" element={<User allUsers={props.allUsers} />} />
      </Routes>
    </Router>
  );
};
