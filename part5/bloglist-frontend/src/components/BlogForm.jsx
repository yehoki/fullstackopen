import React, { useState } from 'react';

export const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    props.addBlog(blogObject);
    setTitle('');
    setAuthor('');
    setUrl('');
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
