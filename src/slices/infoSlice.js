import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    info: [],
    nextId: 0,
  },
  reducers: {
    addInfo: (state, action) => {
      const {
        name,
        img,
        friendId,
        friendEmail,
        userName,
        groupId,
        members,
        ownerId,
      } = action.payload;
      // Check if the object already exists based on the 'name' property (or any other unique property)
      const exists = state.info.some((obj) => obj.name === name);

      if (!exists) {
        const newObject = {
          id: state.nextId,
          name,
          img,
          content: [],
          active: true,
          lastMsg: "Click Here To Message",
          friendId,
          friendEmail,
          userName,
          groupId,
          members,
          ownerId,
        };
        state.info.push(newObject);
        state.nextId += 1;
      } else {
        state.info = state.info.map((obj) =>
          obj.name === name ? { ...obj, active: true } : obj
        );
      }
    },
    removeActive: (state, action) => {
      state.info = [];
    },
    setChatContent: (state, action) => {
      state.info = state.info.map((item) =>
        item.active === true
          ? { ...item, content: [...item.content, action.payload] }
          : item
      );
    },
    setChatImage: (state, action) => {
      state.info = state.info.map((item) =>
        item.active === true
          ? {
              ...item,
              content: [
                ...item.content,
                URL.createObjectURL(action.payload) !== null
                  ? URL.createObjectURL(action.payload) + "img"
                  : "",
              ],
            }
          : item
      );
    },
    setChatVoice: (state, action) => {
      state.info = state.info.map((item) =>
        item.active === true
          ? {
              ...item,
              content: [
                ...item.content,
                URL.createObjectURL(action.payload) !== null
                  ? URL.createObjectURL(action.payload) + "rec"
                  : "",
              ],
            }
          : item
      );
    },
    setLastMsg: (state, action) => {
      state.info = state.info.map((item) =>
        item.active === true ? { ...item, lastMsg: action.payload } : item
      );
    },
  },
});

export const {
  addInfo,
  removeActive,
  setChatContent,
  setChatImage,
  setChatVoice,
  setLastMsg,
} = infoSlice.actions;

export default infoSlice.reducer;
