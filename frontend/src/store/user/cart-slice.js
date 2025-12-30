import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems : [],
    isLoading : false
};

const addToCart = createAsyncThunk('cart/addToCart',async({userId,productId,quantity},thunkAPI)=>{
    try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/user/cart/add`,
                { 
                    userId,
                    productId,
                    quantity,   
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
});

const fetchCartItems = createAsyncThunk('cart/fetchCartItems',async(userId,thunkAPI)=>{
    try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/user/cart/get/${userId}`,
                { 
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
});

const updateCartItemQty = createAsyncThunk('cart/updateCartItemQty',async({userId,productId,quantity},thunkAPI)=>{
    try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/user/cart/update-cart`,
                { 
                    userId,
                    productId,
                    quantity,   
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
});

const deleteCardItem = createAsyncThunk('cart/deleteCartItem',async({userId,productId},thunkAPI)=>{
    try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/user/cart/${userId}/${productId}`,
                { 
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
}) 

const userCartSlice = createSlice({
    name: 'shopingCart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(addToCart.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.cartItems = action.payload.data
            })
            .addCase(addToCart.rejected,(state)=>{
                state.isLoading = false,
                state.cartItems = []
            })
            .addCase(fetchCartItems.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchCartItems.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.cartItems = action.payload.data
            })
            .addCase(fetchCartItems.rejected,(state)=>{
                state.isLoading = false,
                state.cartItems = []
            })
            .addCase(updateCartItemQty.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateCartItemQty.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.cartItems = action.payload.data
            })
            .addCase(updateCartItemQty.rejected,(state)=>{
                state.isLoading = false,
                state.cartItems = []
            })
            .addCase(deleteCardItem.pending,(state)=>{
                state.isLoading = false
            })
            .addCase(deleteCardItem.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.cartItems = action.payload.data
            })
            .addCase(deleteCardItem.rejected,(state)=>{
                state.isLoading = false,
                state.cartItems = []
            })
    }
})

export default userCartSlice.reducer;
export {addToCart, fetchCartItems, updateCartItemQty, deleteCardItem}
