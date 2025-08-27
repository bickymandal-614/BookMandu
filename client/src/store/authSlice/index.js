import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        credentials,
        { withCredentials: true }
      );
      toast.success(response.data.message,{autoClose:2000})
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message,{autoClose: 2000})
      console.log(err.response.data)
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async (thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/my-profile",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data || { message: err.message }
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload.message || "login failed.");
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
