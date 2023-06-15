/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/BlogReducer';
import { initializeUser } from '../reducers/UserReducer';
import BlogForm from './BlogForm';
import { Togglable } from './Togglable';
import { LoginArea } from './LoginArea';
import { LoginDisplay } from './LoginDisplay';
import { Blogs } from './Blogs';
export const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  // const user = useSelector((state) => state.user);

  return (
    <>
      <h2>Blogs</h2>
      <Togglable
        id="new-blog-toggle"
        buttonLabel="Create new blog"
        ref={props.blogFormRef}
      >
        <BlogForm />
      </Togglable>
      <Blogs />
    </>
  );
};
