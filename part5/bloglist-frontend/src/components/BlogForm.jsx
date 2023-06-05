import React from 'react';

export const BlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <h2>Create a new blog</h2>
        <div>
          <label>
            Title:{' '}
            <input
              value={props.newTitle}
              onChange={({ target }) => props.setTitle(target.value)}
              name="blogTitle"
            />
          </label>
          <br />
          <label>
            Author:{' '}
            <input
              value={props.newAuthor}
              onChange={({ target }) => props.setAuthor(target.value)}
              name="blogAuthor"
            />
          </label>
          <br />
          <label>
            Url:{' '}
            <input
              value={props.newUrl}
              onChange={({ target }) => props.setUrl(target.value)}
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
