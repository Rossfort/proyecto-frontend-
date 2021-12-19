import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: undefined,
  errors: [],
};

export const authLogin = createAsyncThunk(
    'auth/login', async (userParams) => {
      const res = await axios.post(
          process.env.REACT_APP_BASE_API_URL + `/api/login`,
          userParams,
          {withCredentials: true});
      return res.data;
    },
);

export const authLogout = createAsyncThunk(
    'auth/logout', async () => {
      const res = await axios.delete(
          process.env.REACT_APP_BASE_API_URL + `/api/logout`,
          {withCredentials: true});
      return res.data;
    },
);

export const authAutoLogin = createAsyncThunk(
    'auth/auto_login', async () => {
      const res = await axios.get(
          process.env.REACT_APP_BASE_API_URL + `/api/current_user`,
          {withCredentials: true});
      return res.data;
    },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    [authLogin.fulfilled]: (state, action) => {
      if (action.payload.logged_in === true) {
        state.user = action.payload.user;
        state.errors = [];
      } else {
        state.errors = action.payload.errors;
      }
    },
    [authLogout.fulfilled]: (state, action) => {
      state.user = undefined;
    },
    [authAutoLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    [authAutoLogin.rejected]: (state, action) => {
      state.user = undefined;
    },
  },
});


export default authSlice.reducer;
