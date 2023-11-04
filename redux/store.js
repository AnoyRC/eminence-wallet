"use client";

import { configureStore } from "@reduxjs/toolkit";
import { defaultSlice } from "./defaultSlice.js";
import { walletSlice } from "./walletSlice.js";
import { toastSlice } from "./toastSlice.js";
import { graphSlice } from "./graphSlice.js";
import { checkLoginSlice } from "./checkLoginSlice.js";
import { contactsSlice } from "./contactsSlice.js";
import { contactSlice } from "./contactSlice.js";
import { profileSlice } from "./profileSlice.js";
import { fileSlice } from "./fileSlice.js";

export const store = configureStore({
  reducer: {
    default: defaultSlice.reducer,
    wallet: walletSlice.reducer,
    toast: toastSlice.reducer,
    graph: graphSlice.reducer,
    contact: contactSlice.reducer,
    checkLogin: checkLoginSlice.reducer,
    contacts: contactsSlice.reducer,
    profile: profileSlice.reducer,
    file: fileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
