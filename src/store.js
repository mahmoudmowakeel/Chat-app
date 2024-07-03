import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./slices/messagesSlice";
import friendsReducer from "./slices/friendsSlice";
import infoReducer from "./slices/infoSlice";
import authReducer from "./slices/AuthenticationSlice";
import chatReducer from "./slices/chatSlice";
import imageReducer from "./slices/imageSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    community: friendsReducer,
    info: infoReducer,
    auth: authReducer,
    chat: chatReducer,
    image: imageReducer,
  },
});

export default store;
