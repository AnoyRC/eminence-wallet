import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopup: false,
  isPayPopup: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    togglePopup: (state, action) => {
      state.isPopup = action.payload;
    },
    togglePayPopup: (state, action) => {
      state.isPayPopup = action.payload;
    },
  },
});

export const { setLogin, togglePopup, togglePayPopup } = contactsSlice.actions;
