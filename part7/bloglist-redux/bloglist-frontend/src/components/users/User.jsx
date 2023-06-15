import React from 'react';
import { Link, useParams } from 'react-router-dom';
export const User = (props) => {
  const id = useParams().id;

  const user = props.allUsers.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  const userBlogs = user.blogs.map((blog) => {
    return (
      <li key={blog.title}>
        <Link to={`/blogs/${blog.id}`}>1</Link>
        {blog.title}
      </li>
    );
  });
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>{userBlogs}</ul>
    </div>
  );
};
