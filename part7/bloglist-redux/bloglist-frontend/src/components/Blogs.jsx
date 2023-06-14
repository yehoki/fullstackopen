import React from 'react';
import Blog from './Blog';
import { sortByLikes } from '../reducers/BlogReducer';
import { useSelector } from 'react-redux';
export const Blogs = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const sortedBlogs = sortByLikes(blogs);
  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </>
  );
};
