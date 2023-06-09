import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action) {
      console.log(state, action);
      return action.payload;
    },
  },
});

export const filterChange = (filter) => {
  return {
    type: 'filter/filter',
    payload: filter,
  };
};

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
