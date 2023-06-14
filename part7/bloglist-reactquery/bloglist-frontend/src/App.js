import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import { LoginArea } from './components/LoginArea';
import loginService from './services/login';
import { LoginDisplay } from './components/LoginDisplay';
import { Notification } from './components/Notification';
import BlogForm from './components/BlogForm';
import { Togglable } from './components/Togglable';
import { Blogs } from './components/Blogs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  makeNotification,
  useNotificationDispatch,
} from './context/NotificationContext';
import {
  handleLog,
  initializeUser,
  useUser,
  useUserDispatch,
} from './context/UserContext';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const setNotification = useNotificationDispatch();
  const setUser = useUserDispatch();
  const blogFormRef = useRef();

  const loginMutation = useMutation(loginService.login, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  // const user = useQuery('user', loginService.login, {
  //   retry: 1,
  // });

  // console.log(user);

  useEffect(() => {
    initializeUser(setUser);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
    handleLog(setUser, { username, password });
    console.log('creds', username, password);
  };


  const handleBlogCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.createBlog(blogObject);
      makeNotification(
        setNotification,
        `Added ${blogObject.title} by ${blogObject.author}`
      );
    } catch (exc) {
      makeNotification(setNotification, exc.response.data.error);
    }
  };

  const addLike = async (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    makeNotification(setNotification, `You liked blog ${blog.title}`);
  };
  const user = useUser();

  const result = useQuery('blogs', blogService.getAll, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading Blogs...</div>;
  } else if (result.isError) {
    return <div>There has been a problem loading blogs</div>;
  }

  const blogs = result.data;

  const removeBlog = async (id) => {
    deleteBlogMutation.mutate(id);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Blog App</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginArea
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <LoginDisplay name={user.name} blogs={blogs} />
          <Togglable
            id="new-blog-toggle"
            buttonLabel="Create new blog"
            ref={blogFormRef}
          >
            <BlogForm addBlog={handleBlogCreate} />
          </Togglable>
          <Blogs
            blogs={blogs}
            addLike={addLike}
            removeBlog={removeBlog}
            currentUser={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
