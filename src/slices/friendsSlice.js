import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUsers = createAsyncThunk(
  "community/users",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        "https://academix.runasp.net/api/ChattUsers/GetAllUserData"
      );
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getFriends = createAsyncThunk(
  "community/getFriends",
  async ({ UserId }, thunkAPI) => {
    try {
      const res = await fetch(`
        https://academix.runasp.net/api/ChattUsers/GetUserFriends${UserId}`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getGroups = createAsyncThunk(
  "community/getGroups",
  async ({ UserId }, thunkAPI) => {
    try {
      const res = await fetch(`
        https://academix.runasp.net/api/ChattUsers/GetUserGroups${UserId}`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getGroupMembers = createAsyncThunk(
  "community/getGroupMembers",
  async ({ groupid }, thunkAPI) => {
    try {
      const res = await fetch(`
    https://academix.runasp.net/api/ChattUsers/GetGroupMembers${groupid}`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const addFriends = createAsyncThunk(
  "community/addFriends",
  async ({ userId, friendId }, thunkAPI) => {
    try {
      // const payload = { userId, friendId };

      const res = await fetch(
        "https://academix.runasp.net/api/ChattUsers/AddFriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, friendId }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        throw new Error("user Not valid");
        // return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Can not Add this Friend",
      });
    }
  }
);

export const removeFriend = createAsyncThunk(
  "community/removeFriend",
  async ({ friendid, userid }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://academix.runasp.net/api/ChattUsers/RemoveFriend?friendid=${friendid}&userid=${userid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error("friend Not valid");
        // return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Can not Remove this Friend",
      });
    }
  }
);

const initialState = {
  users: [],
  friends: [],
  groups: [],
  groupMessages: [],
  members: [],
  loading: false,
  loadGroupChat: false,
};

const friendsSlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    removeGroupMember(state, action) {
      state.members = state.members.filter(
        (member) => member.User.UserName !== action.payload
      );
    },
    addGroupMessage: (state, action) => {
      state.groupMessages.push(action.payload);
    },
    addGroupMember(state, action) {
      state.members.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addFriends.fulfilled, (state, action) => {
        state.friends = [...state.friends, action.payload];
      })

      .addCase(getFriends.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload.map((friend) => friend.Friend);
        state.loading = false;
      })
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(getGroupMembers.pending, (state) => {
        state.loadGroupChat = true;
      })
      .addCase(getGroupMembers.fulfilled, (state, action) => {
        state.members = action.payload.groupmembers;
        state.groupMessages = action.payload.groupmessages[0];
        state.loadGroupChat = false;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.friends = state.friends.filter(
          (friend) => friend.Id !== action.payload.FriendId
        );
      });
  },
});

export const {
  addFriend,
  addGroup,
  removeGroupMember,
  addGroupMessage,
  addGroupMember,
} = friendsSlice.actions;

export default friendsSlice.reducer;
