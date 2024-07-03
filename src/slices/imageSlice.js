import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addImage = createAsyncThunk(
  "image/addImage",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(
        "https://academix.runasp.net/api/ChattUsers/SendMessageFile",
        {
          method: "POST",

          body: formData,
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
        message: "Can not Add this image",
      });
    }
  }
);
export const addGroupImage = createAsyncThunk(
  "image/addGroupImage",
  async (formData, thunkAPI) => {
    try {
      const res = await fetch(
        "https://academix.runasp.net/api/ChattUsers/SendGroupFile",
        {
          method: "POST",

          body: formData,
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
        message: "Can not Add this image to group",
      });
    }
  }
);

export const getImages = createAsyncThunk(
  "image/getImages",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://academix.runasp.net/api/ChattUsers/GetMessageFile${id}`
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
export const getGroupImages = createAsyncThunk(
  "image/getGroupImages",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://academix.runasp.net/api/ChattUsers/GetGroupFile${id}`
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

const initialState = {
  images: null,
  id: null,
  loading: "none",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetImage(state, action) {
      state.id = null;
      state.images = null;
      state.loading = "none";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addImage.pending, (state) => {
        state.loading = "uploading";
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.id = action.payload.Id;
        state.loading = "uploaded";
        console.log(state.id);
      })
      .addCase(addGroupImage.pending, (state) => {
        state.loading = "uploading";
      })
      .addCase(addGroupImage.fulfilled, (state, action) => {
        state.id = action.payload.Id;
        state.loading = "uploaded";
        console.log(state.id);
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(getGroupImages.fulfilled, (state, action) => {
        state.images = action.payload;
      });
  },
});

export const { resetImage } = imageSlice.actions;

export default imageSlice.reducer;
