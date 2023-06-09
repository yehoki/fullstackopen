import { combineReducers } from 'redux';
import anecdoteReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';
import notificationReducer from '../reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
});

export const store = configureStore({
  reducer: reducer,
});
