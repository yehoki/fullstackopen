import React, { useState } from 'react';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisible = {
    display: visible ? '' : 'none',
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleLikeButton = (event) => {
    const newObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes + 1,
      user: props.blog.user.id,
    };
    props.addLike(props.blog.id, newObject);
  };

  const handleRemoveButton = (event) => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    ) {
      props.removeBlog(props.blog.id);
    }
  };

  const isYours = () => {
    return props.currentUser.name === props.blog.user.name;
  };

  return (
    <>
      <div style={blogStyle}>
        {props.blog.title} by {props.blog.author}
        <button onClick={toggleVisible}>{visible ? 'Hide' : 'Show'}</button>
        <div style={showWhenVisible}>
          <div>{props.blog.url}</div>
          <div>
            Likes: {props.blog.likes}{' '}
            <button onClick={handleLikeButton}>Like</button>
          </div>
          <div>{props.blog.user.name}</div>
          {isYours() ? (
            <button onClick={handleRemoveButton}>Remove</button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
