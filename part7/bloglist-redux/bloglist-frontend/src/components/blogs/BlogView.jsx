import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewComment, likeBlog } from '../../reducers/BlogReducer';

export const BlogView = (props) => {
  const blogId = useParams().id;
  const theBlog = props.allBlogs.find((blog) => blog.id === blogId);
  const dispatch = useDispatch();

  if (!theBlog) {
    return null;
  }
  const handleLikeButton = () => {
    dispatch(likeBlog(theBlog.id));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addNewComment(event.target.commentText.value, theBlog.id));
  };

  const blogComments = theBlog.comments.map((comment) => {
    const randomId = (100000 * Math.random()).toFixed(0);
    return <li key={randomId}>{comment}</li>;
  });

  return (
    <div>
      <h4>
        {theBlog.title} by {theBlog.author}
      </h4>
      <p>{theBlog.url}</p>
      <div>
        {theBlog.likes} likes <button onClick={handleLikeButton}>Like</button>
      </div>
      <h5>Comments</h5>
      <form onSubmit={handleAddComment}>
        <input type="text" name="commentText" />
        <button>Add comment</button>
      </form>
      <ul>{blogComments}</ul>
    </div>
  );
};
