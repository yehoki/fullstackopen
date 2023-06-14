import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const sortByVotes = (arr) => {
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
    vote(state, action) {
      return state.map((blog) => {
        blog.id !== action.payload.id ? blog : action.payload;
      });
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { vote, appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blogObject) => {
  return async (dispatch) => {
    const savedBlog = await blogService.createBlog(blogObject);
    dispatch(appendBlog(savedBlog));
  };
};

export default blogSlice.reducer;
