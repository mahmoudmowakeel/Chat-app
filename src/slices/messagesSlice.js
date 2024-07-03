import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getChatMesages = createAsyncThunk(
  "message/getChatMessages",

  async ({ senderid, receiverid }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://academix.runasp.net/api/ChattUsers/GetChatMessages?senderid=${senderid}&receiverid=${receiverid} `
      );
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error("Cant get messages");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Can not get this messages",
      });
    }
  }
);

const initialState = {
  content: [],
  chatLoading: false,
  textMessage: "",
  fileMessage: null,
  imgUrl: null,
  voiceRec: null,
  emojies: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.content.push(action.payload);
    },
    sendMessage: (state, action) => {
      state.content = [...state.content, action.payload];
      state.fileMessage = "";
      state.imgUrl = "";
      state.textMessage = "";
    },
    setFile: (state, action) => {
      state.fileMessage = action.payload;
      state.imgUrl = action.payload
        ? URL.createObjectURL(action.payload)
        : null;

      // state.content = [
      //   ...state.content,
      //   state.imgUrl !== null ? state.imgUrl + "img" : "",
      // ];
    },

    setVoice: (state, action) => {
      state.voiceRec = action.payload
        ? URL.createObjectURL(action.payload)
        : null;

      state.content = [
        ...state.content,
        state.voiceRec !== null ? state.voiceRec + "rec" : "",
      ];
    },
    setEmoji: (state, action) => {
      state.emojies = action.payload;
      state.textMessage = state.textMessage + state.emojies;
    },
    clearContent: (state) => {
      state.content = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatMesages.pending, (state, action) => {
        state.chatLoading = true;
      })
      .addCase(getChatMesages.fulfilled, (state, action) => {
        state.content = action.payload;
        state.chatLoading = false;
      });
  },
});

export const {
  sendMessage,
  sendFile,
  setMessage,
  setFile,
  setVoice,
  setEmoji,
  clearContent,
} = messagesSlice.actions;

export default messagesSlice.reducer;
