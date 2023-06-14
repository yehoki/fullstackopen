import React from 'react';
import Blog from './Blog';
import { sortByVotes } from '../reducers/BlogReducer';
import { useSelector } from 'react-redux';
export const Blogs = (props) => {
  const blogs = useSelector((state) => state.blog);
  console.log(blogs);
  const sortedBlogs = sortByVotes(blogs);
  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={props.addLike}
          removeBlog={props.removeBlog}
          currentUser={props.currentUser}
        />
      ))}
    </>
  );
};
