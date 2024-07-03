// src/slices/chatSlice.js

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],

    connectionStatus: "disconnected",
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const { addMessage, setConnectionStatus } = chatSlice.actions;

export default chatSlice.reducer;
