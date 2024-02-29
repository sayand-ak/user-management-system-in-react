import { createSlice } from '@reduxjs/toolkit';
import { loginAdminAsync, getUserData, addUser,updateUserData, deleteUser, logoutAdmin } from './adminAuthAction';

const initialState = {
  admin: null,
  userData: [],
  status: 'idle',
  error: null,
};

const adminAuthSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
        builder.addCase(loginAdminAsync.pending, (state) => {
            state.status = "loading"
            state.error = null
        } )
        builder.addCase(getUserData.pending, (state) => {
          state.status = "loading"
          state.error = null
        })
        builder.addCase(addUser.pending, (state) => {
          state.status = "loading"
          state.error = null
        })
        builder.addCase(updateUserData.pending, (state) => {
          state.status = "loading"
          state.error = null
        })
        builder.addCase(deleteUser.pending, (state) => {
          state.status = "loading"
          state.error = null
        })
        builder.addCase(logoutAdmin.pending, (state) => {
          state.status = "loading"
          state.error = null
        })
        builder.addCase(loginAdminAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.admin = action.payload
            state.error = null
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
          state.status = "success"
          state.userData = action.payload
          state.error = null
        })
        builder.addCase(addUser.fulfilled, (state) => {
          state.status = "success"
          state.error = null
        })
        builder.addCase(updateUserData.fulfilled, (state) => {
          state.status = "success"
          state.error = null
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
          state.status = "success"
          state.error = null
        })
        builder.addCase(logoutAdmin.fulfilled, (state) => {
          state.status = "success"
          state.error = null
        })
        builder.addCase(loginAdminAsync.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        builder.addCase(getUserData.rejected, (state, action) => {
          state.status = "rejected"
          state.error = action.error.message
      })
      builder.addCase(addUser.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      })
      builder.addCase(updateUserData.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      });
      builder.addCase(deleteUser.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      })
      builder.addCase(logoutAdmin.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      })
    },
});

export default adminAuthSlice.reducer;
