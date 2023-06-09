import { createSlice } from '@reduxjs/toolkit';

// export const setNotification = (notification) => {
//   return {
//     type: 'notification/notify',
//     payload: notification,
//   };
// };

export const removeNotification = () => {
  return {
    type: 'notification/remove',
    action: '',
  };
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    remove(state, action) {
      return '';
    },
  },
});

export const { notify, remove } = notificationSlice.actions;

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(notify(text));
    await setTimeout(() => {
      dispatch(remove(text));
    }, 1000 * seconds);
  };
};

export default notificationSlice.reducer;
