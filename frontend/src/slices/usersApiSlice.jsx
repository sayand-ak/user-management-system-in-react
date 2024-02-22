import { createSlice } from '@reduxjs/toolkit';
import { loginUserAsync, signupUserAsync, setProfileAsync, logoutAsync, updateUerProfileAsync } from './userAuthAction';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {

    // Loading state
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setProfileAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUerProfileAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      });

    // Fulfilled state
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(setProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateUerProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      });

    // Rejected state
    builder
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(setProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUerProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export {
  loginUserAsync,
  signupUserAsync,
  setProfileAsync,
  logoutAsync,
  updateUerProfileAsync,
};
export default userAuthSlice.reducer;
