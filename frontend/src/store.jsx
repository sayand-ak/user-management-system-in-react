import { configureStore } from "@reduxjs/toolkit";
import { adminAuthSlice, userAuthSlice } from "./slices/authSlice"; // Adjust the path
import usersApiSlice from "./slices/usersApiSlice";
import adminApiSlice from "./slices/adminApiSlice";

const store = configureStore({
  reducer: {
    auth: userAuthSlice.reducer,
    admin: adminAuthSlice.reducer,
    api: usersApiSlice,
    adminApi: adminApiSlice
  },
  devTools: true,
});

export default store;
