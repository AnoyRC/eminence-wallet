import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact: null,
  chatId: null,
  messages: [],
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.contact = action.payload;
    },

    clearSelectedContact: () => initialState,

    setChatId: (state, action) => {
      state.chatId = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setSelectedContact,
  clearSelectedContact,
  setChatId,
  addMessage,
  setMessages,
  clearMessages,
} = contactSlice.actions;
