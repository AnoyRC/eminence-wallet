import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  connection: "https://ren.rpcpool.com",
  balance: 0,
  balanceUSDC: 0,
  balanceListerners: [],
  contacts: [],
  quote: null,
  quoteUSDC: null,
  vouchers: [],
  transactions: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDevnet: (state) => {
      state.connection = "https://api.devnet.solana.com";
    },
    setMainnet: (state) => {
      state.connection = "https://ren.rpcpool.com";
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setBalanceUSDC: (state, action) => {
      state.balanceUSDC = action.payload;
    },
    addBalanceListener: (state, action) => {
      state.balanceListerners.push(action.payload);
    },
    removeAllBalanceListeners: (state) => {
      state.balanceListerners = [];
    },
    setUserContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    setQuoteUSDC: (state, action) => {
      state.quoteUSDC = action.payload;
    },
    setVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    addVoucher: (state, action) => {
      state.vouchers.push(action.payload);
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    removeAllTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  setUser,
  setDevnet,
  setMainnet,
  setBalance,
  setBalanceUSDC,
  addBalanceListener,
  removeAllBalanceListeners,
  setUserContacts,
  setQuote,
  setQuoteUSDC,
  setVouchers,
  addVoucher,
  setTransactions,
  removeAllTransactions,
} = profileSlice.actions;
