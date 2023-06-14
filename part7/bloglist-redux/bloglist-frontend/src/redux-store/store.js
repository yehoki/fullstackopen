import { configureStore } from '@reduxjs/toolkit';
import NotificationReducer from '../reducers/NotificationReducer';
import BlogReducer from '../reducers/BlogReducer';

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blog: BlogReducer
  },
});

export default store;
