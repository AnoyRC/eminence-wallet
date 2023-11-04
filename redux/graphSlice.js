import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  weekStat: null,
  value: "1m",
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setWeekStat: (state, action) => {
      state.weekStat = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHistory, setWeekStat, setValue } = graphSlice.actions;
