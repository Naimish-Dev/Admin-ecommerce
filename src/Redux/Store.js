import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import ProductSlice from "./ProductSlice";
import usersSlice from "./usersSlice";


const Store = configureStore({
  reducer: { user: UserSlice, product: ProductSlice,users : usersSlice },
});
export default Store;