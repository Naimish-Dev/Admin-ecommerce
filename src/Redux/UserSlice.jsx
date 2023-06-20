import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    islogin: false,
    userdata: {},
    isFeatching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFeatching = true;
    },
    loginSucess: (state, action) => {
      state.isFeatching = false;
      state.userdata = action.payload;
      state.islogin = true;
      state.error = false;
    },
    loginError: (state) => {
      state.isFeatching = false;
      state.error = true;
    },
    logout: (state) => {
      state.userdata = [];
      state.islogin = false;
    },
  },
});

export const { loginStart, loginSucess, loginError,logout } = UserSlice.actions;
export default UserSlice.reducer;
