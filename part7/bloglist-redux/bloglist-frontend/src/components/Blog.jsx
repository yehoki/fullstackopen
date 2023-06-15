/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Blog = (props) => {
  return (
    <>
      <Link to={`/blogs/${props.blog.id}`}>
        <div className="blog" id={props.blog.title}>
          {props.blog.title} by {props.blog.author}
        </div>
      </Link>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Blog;
