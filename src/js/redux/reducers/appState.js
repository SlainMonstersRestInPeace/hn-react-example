import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    itemsPerPage: 30
  },
  reducers: {
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    }
  }
});

export default appSlice.reducer

export const {
  setItemsPerPage
} = appSlice.actions;