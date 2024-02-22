import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import usersApiSlice from "./slices/usersApiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    api: usersApiSlice
  },
  devTools: true,
});

export default store;
