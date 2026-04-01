import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartproduct";
import productReducer from "./productslice";
import orderReducer from "./orderslice";
import addressReducer from "./adminslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cartItem: cartReducer,
    product: productReducer,
    orders: orderReducer,
    addresses: addressReducer,
  },
});