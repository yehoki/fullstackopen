import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './NotificationReducer';

export const sortByLikes = (arr) => {
  const arrForSort = [...arr];
  return arrForSort.sort((first, second) => {
    if (first.votes > second.votes) {
      return -1;
    } else if (first.votes < second.votes) {
      return 1;
    }
    return 0;
  });
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      return state.map((blog) => {
        const parsedBlog = JSON.parse(JSON.stringify(blog));
        return parsedBlog.id !== action.payload.id ? blog : action.payload;
      });
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    filterBlogs(state, action) {
      return state.filter((blog) => {
        const parsedBlog = JSON.parse(JSON.stringify(blog));
        return parsedBlog.id !== action.payload;
      });
    },
  },
});

export const { like, appendBlog, setBlogs, filterBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blogObject) => {
  return async (dispatch) => {
    let savedBlog;
    try {
      console.log('test');
      savedBlog = await blogService.createBlog(blogObject);
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 'error-message', 5));
    }
    console.log(savedBlog, savedBlog === undefined);
    if (savedBlog !== undefined) {
      dispatch(appendBlog(savedBlog));
      dispatch(
        setNotification(
          `Added new blog: "${blogObject.title} by ${blogObject.author}"`,
          'add-message',
          5
        )
      );
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id);
    console.log(blog);
    const edittedBlog = { ...blog, likes: blog.likes + 1 };
    const waitBlog = await blogService.update(id, edittedBlog);
    console.log(waitBlog);
    dispatch(like(edittedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(filterBlogs(id));
  };
};

export default blogSlice.reducer;
