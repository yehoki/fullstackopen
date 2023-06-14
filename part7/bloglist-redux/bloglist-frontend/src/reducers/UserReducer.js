import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import { setNotification } from './NotificationReducer';
import blogService from '../services/blogs';
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    setUser(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    getUser(state, action) {
      return state;
    },
    // eslint-disable-next-line no-unused-vars
    removeUser(state, action) {
      return null;
    },
  },
});

export const { login, setUser, removeUser } = userSlice.actions;

export const userLogin = (credentials) => {
  console.log(credentials);
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(setNotification(`Welcome ${user.name}!`, 'add-message', 5));
    } catch (err) {
      dispatch(
        setNotification('Incorrect username or password', 'error-message', 5)
      );
    }
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const clearUser = () => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(removeUser());
    dispatch(setNotification('You have been logged out', 'add-message', 5));
  };
};

export default userSlice.reducer;
