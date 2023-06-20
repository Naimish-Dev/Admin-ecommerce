import { createSlice } from "@reduxjs/toolkit";
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isloding: false,
    error: false,
  },
  reducers: {
    //////////// Fetching users   //////////////
    loding: (state, action) => {
      state.isloding = true;
    },
    fetchingusers: (state, action) => {
      state.isloding = false;
      state.users = action.payload;
      state.error = false;
    },
    error: (state, action) => {
      state.error = true;
    },
    ////// Delete users ///////////

    deletingusers: (state, action) => {
      state.isloding = false;
      state.users.slice(
        state.users.findIndex((items) => {
          return items._id === action.payload;
        }),
        1
      );
      state.error = false;
    },

    ////////// Upadte users/////////////////

    updatingusers: (state, action) => {
      console.log(action.payload);
      state.isloding = false;
      state.users[
        state.users.findIndex((val) => val._id === action.payload.userId)
      ] = action.payload.user;
      state.error = false;
    },

    ///////// add users ////////

    addingusers: (state, action) => {
      state.isloding = false;
      state.users = [...state.users, action.payload];
      state.error = false;
      console.log(state.users);
    },
  },
});

export const {
  loding,
  fetchingusers,
  error,
  deletingusers,
  updatingusers,
  addingusers,
} = usersSlice.actions;
export default usersSlice.reducer;
