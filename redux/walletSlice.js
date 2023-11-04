import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pubKey: null,
  mnemonics: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setPubKey: (state, action) => {
      state.pubKey = action.payload;
    },
    setMnemonics: (state, action) => {
      state.mnemonics = action.payload;
    },
    flush: (state) => {
      state.pubKey = null;
      state.mnemonics = null;
    },
  },
});

export const { setMnemonics, setPubKey, flush } = walletSlice.actions;
