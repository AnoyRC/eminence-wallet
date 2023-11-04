import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  isPopup: false,
};

export const checkLoginSlice = createSlice({
  name: "checkLogin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogged = action.payload;
    },
    togglePopup: (state, action) => {
      state.isPopup = action.payload;
    },
  },
});

export const { setLogin, togglePopup } = checkLoginSlice.actions;
