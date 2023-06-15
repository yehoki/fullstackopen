import { configureStore } from '@reduxjs/toolkit';
import NotificationReducer from '../reducers/NotificationReducer';
import BlogReducer from '../reducers/BlogReducer';
import UserReducer from '../reducers/UserReducer';
import AllUsersReducer from '../reducers/AllUsersReducer';
const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blog: BlogReducer,
    user: UserReducer,
    users: AllUsersReducer,
  },
});

export default store;
