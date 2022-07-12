import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    spinner: false,
  },
  reducers: {
    setSpinner(state, action) {
      state.spinner = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
