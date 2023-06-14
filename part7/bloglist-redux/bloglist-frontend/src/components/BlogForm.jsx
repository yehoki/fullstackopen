import React from 'react';
import { useDispatch } from 'react-redux';
import { newBlog } from '../reducers/BlogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.blogTitle.value,
      author: event.target.blogAuthor.value,
      url: event.target.blogUrl.value,
    };
    dispatch(newBlog(blogObject));
  };
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <h2>Create a new blog</h2>
        <div>
          <label>
            Title: <input name="blogTitle" />
          </label>
          <br />
          <label>
            Author: <input name="blogAuthor" />
          </label>
          <br />
          <label>
            Url: <input name="blogUrl" />
          </label>
        </div>
        <br />
        <button id="submit-blog-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
