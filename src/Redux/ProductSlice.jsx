import { createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isloding: false,
    error: false,
  },
  reducers: {
    //////////// Fetching Products   //////////////
    loding: (state, action) => {
      state.isloding = true;
    },
    fetchingproducts: (state, action) => {
      state.isloding = false;
      state.products = action.payload;
      state.error = false;
    },
    error: (state, action) => {
      state.error = true;
    },
    ////// Delete products ///////////
   
    deletingproducts: (state, action) => {
      state.isloding = false;
      state.products.slice(
        state.products.findIndex((items) => {
          return items._id === action.payload;
        }),
        1
      );
      state.error = false;
    },
   

    ////////// Upadte Product/////////////////
    
    updatingproducts: (state, action) => {
      console.log(action.payload);
      state.isloding = false;
      state.products[
        state.products.findIndex((val) => val._id === action.payload.productId)
      ] = action.payload.product;
      state.error = false;
    },
    

    ///////// add Product ////////
    
    addingproducts: (state, action) => {
      state.isloding = false;
      state.products =[...state.products,action.payload]; 
      state.error = false;
      console.log(state.products);
    },
    
  },
});

export const {
  loding,
  fetchingproducts,
  error,
  deletingproducts,
  updatingproducts,
  addingproducts,
} = productsSlice.actions;
export default productsSlice.reducer;
