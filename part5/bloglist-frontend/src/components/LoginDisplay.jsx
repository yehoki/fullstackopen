import React from 'react';
import Blog from './Blog';

export const LoginDisplay = (props) => {
  return (
    <>
      <div>
        <h2>Blogs</h2>
        {props.name} logged in
        <div>
          <button onClick={props.onClick}>Logout</button>
        </div>
      </div>
      <div>
        {props.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};
