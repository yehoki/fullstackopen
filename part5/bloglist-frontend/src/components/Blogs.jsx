import React from 'react';
import Blog from './Blog';
export const Blogs = (props) => {
  const sortedBlogs = props.blogs.sort((firstBlog, secondBlog) => {
    if (firstBlog.likes > secondBlog.likes) {
      return -1;
    }
    if (firstBlog.likes < secondBlog.likes) {
      return 1;
    }
    return 0;
  });

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
