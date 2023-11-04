import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  file: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { setFile, setImage } = fileSlice.actions;
