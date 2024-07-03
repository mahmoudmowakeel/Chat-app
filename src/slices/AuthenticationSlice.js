import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch {
    // ingnore
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://academix.runasp.net/api/Auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error("user Not valid");
        // return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "Please enter valid email and password",
      });
    }
  }
);

const initialState = loadState() || {
  isAuth: false,
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      saveState(state);
    },
    logedin(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        state.isAuth = true;
        saveState(state);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, logedin } = authSlice.actions;

export default authSlice.reducer;
