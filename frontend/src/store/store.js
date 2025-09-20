import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/auth'
import AdminProductSlice from './admin/product-slice'
import UserProductSlice from './user/product-slice'
import shoppingCart from './user/cart-slice'
import addressSlice from './user/address-slice'
import userOrderSlice from './user/order-slice'

// we will combine all the slices in this
const  store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductSlice,
        userProducts: UserProductSlice,
        shopCart : shoppingCart,
        userAddress : addressSlice,
        userOrder : userOrderSlice,
    },
});

export default store;