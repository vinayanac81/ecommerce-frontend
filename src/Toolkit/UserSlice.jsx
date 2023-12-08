import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: JSON.parse(localStorage.getItem("user")) ?? {},
  userCart:localStorage.getItem('cart') ?? "0"
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserCart: (state, action) => {
      console.log(action.payload);
      state.userCart = action.payload;
    },
  },
});
export const { setUserDetails,setUserCart } = UserSlice.actions;
export default UserSlice.reducer;
