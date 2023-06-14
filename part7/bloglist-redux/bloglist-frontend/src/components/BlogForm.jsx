import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newBlog } from '../reducers/BlogReducer';
import { setNotification } from '../reducers/NotificationReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  console.log(dispatch);
  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.blogTitle.value,
      author: event.target.blogAuthor.value,
      url: event.target.blogUrl.value,
    };
    console.log(blogObject);

    try {
      dispatch(newBlog(blogObject));
      dispatch(
        setNotification(
          `A new anecdote has been added: '${blogObject.title} by ${blogObject.author}`,
          'add-message',
          5
        )
      );
    } catch (exc) {
      dispatch(setNotification(exc.response.data.error));
    }
  };
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <h2>Create a new blog</h2>
        <div>
          <label>
            Title:{' '}
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              name="blogTitle"
            />
          </label>
          <br />
          <label>
            Author:{' '}
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              name="blogAuthor"
            />
          </label>
          <br />
          <label>
            Url:{' '}
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              name="blogUrl"
            />
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
