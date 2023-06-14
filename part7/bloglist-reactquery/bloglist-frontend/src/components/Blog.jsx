import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleLikeButton = () => {
    const newObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user.id,
      id: props.blog.id,
    };
    console.log(newObject);
    props.addLike(newObject);
  };


  const handleRemoveButton = () => {
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
      <div className="blog" id={props.blog.title}>
        {props.blog.title} by {props.blog.author}
        <button
          className={visible ? 'hide-button' : 'show-button'}
          onClick={toggleVisible}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
        {visible ? (
          <div>
            <div>{props.blog.url}</div>
            <div>
              {`Likes: ${props.blog.likes}`}
              <button className="like-button" onClick={handleLikeButton}>
                Like
              </button>
            </div>
            <div>{props.blog.user.name}</div>
            {isYours() ? (
              <button id="remove-blog-button" onClick={handleRemoveButton}>
                Remove
              </button>
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
