import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../../reducers/BlogReducer';

export const BlogView = (props) => {
  const blogId = useParams().id;
  const theBlog = props.allBlogs.find((blog) => blog.id === blogId);
  const dispatch = useDispatch();
  const handleLikeButton = () => {
    dispatch(likeBlog(theBlog.id));
  };
  if (!theBlog) {
    return null;
  }
  return (
    <div>
      <h4>
        {theBlog.title} by {theBlog.author}
      </h4>
      <p>{theBlog.url}</p>
      <div>
        {theBlog.likes} likes <button onClick={handleLikeButton}>Like</button>
      </div>
    </div>
  );
};
