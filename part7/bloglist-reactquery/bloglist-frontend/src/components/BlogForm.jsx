import React from 'react';
import {
  makeNotification,
  useNotificationDispatch,
} from '../context/NotificationContext';
import { useQueryClient, useMutation } from 'react-query';
import blogService from '../services/blogs';
const BlogForm = () => {
  const setNotification = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.createBlog, {
    refetchOnWindowFocus: false,
    onSuccess: (newBlog) => {
      console.log('Success', newBlog);
      const blogs = queryClient.getQueryData('blogs');
      queryClient.invalidateQueries('blogs', blogs.concat(newBlog));
    },
    onError: () => {
      makeNotification(
        setNotification('There has been a problem with your blog.')
      );
    },
  });

  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.blogTitle.value,
      author: event.target.blogAuthor.value,
      url: event.target.blogUrl.value,
    };
    newBlogMutation.mutate(
      { ...blogObject, likes: 0 },
      {
        onSuccess: () => {
          makeNotification(
            setNotification,
            `You created "${blogObject.title}"!`
          );
        },
        onError: () => {
          makeNotification(setNotification, 'An error occurred: Try again.');
        },
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <h2>Create a new blog</h2>
        <div>
          <label>
            Title: <input name="blogTitle" />
          </label>
          <br />
          <label>
            Author: <input name="blogAuthor" />
          </label>
          <br />
          <label>
            Url: <input name="blogUrl" />
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
