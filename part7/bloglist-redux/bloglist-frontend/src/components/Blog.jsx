import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/BlogReducer';

const Blog = (props) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleLikeButton = () => {
    dispatch(likeBlog(props.blog.id));
  };

  const handleRemoveButton = () => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    ) {
      dispatch(deleteBlog(props.blog.id));
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
