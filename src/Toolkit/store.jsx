import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice";
import UserSlice from "./UserSlice";
export const store = configureStore({
  reducer: {
    admin: AdminSlice,
    user: UserSlice,
  },
});
