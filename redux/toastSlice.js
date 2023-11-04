import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastList: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toastList.push(action.payload);
    },
    removeToast: (state, action) => {
      if (state.toastList.length > 0) {
        state.toastList = state.toastList.slice(1);
      }
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
