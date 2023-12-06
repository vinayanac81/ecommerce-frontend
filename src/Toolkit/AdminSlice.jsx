import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  adminDetails: JSON.parse(localStorage.getItem("admin")) ?? {},
};
const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      console.log(action.payload);
      state.adminDetails = action.payload;
    },
  },
});
export const { setAdminDetails } = AdminSlice.actions;
export default AdminSlice.reducer;
