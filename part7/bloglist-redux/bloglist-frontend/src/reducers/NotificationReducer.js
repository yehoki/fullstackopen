import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    remove() {
      return '';
    },
  },
});

export const { notify, remove } = notificationSlice.actions;

export const setNotification = (text, className, seconds) => {
  return async (dispatch) => {
    dispatch(notify([text, className]));
    await setTimeout(() => {
      dispatch(remove());
    }, 1000 * seconds);
  };
};

export default notificationSlice.reducer;
