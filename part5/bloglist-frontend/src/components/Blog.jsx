import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

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
      <div className="blog">
        {props.blog.title} by {props.blog.author}
        <button className="show-button" onClick={toggleVisible}>
          {visible ? 'Hide' : 'Show'}
        </button>
        {visible ? (
          <div>
            <div>{props.blog.url}</div>
            <div>
              Likes: {props.blog.likes}{' '}
              <button className="like-button" onClick={handleLikeButton}>
                Like
              </button>
            </div>
            <div>{props.blog.user.name}</div>
            {isYours() ? (
              <button onClick={handleRemoveButton}>Remove</button>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
