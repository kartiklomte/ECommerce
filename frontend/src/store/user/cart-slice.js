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

const deleteCartItem = createAsyncThunk('cart/deleteCartItem',async({userId,productId},thunkAPI)=>{
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
    name: 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(addToCart.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addToCart.rejected,(state)=>{
                state.isLoading = false;
            })
            .addCase(fetchCartItems.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCartItems.rejected,(state)=>{
                state.isLoading = false;
                state.cartItems = [];
            })
            // Optimistic update for quantity change
            .addCase(updateCartItemQty.pending,(state, action)=>{
                const { productId, quantity } = action.meta.arg;
                if (state.cartItems?.items) {
                    const item = state.cartItems.items.find(item => item.productId === productId);
                    if (item) {
                        item.quantity = quantity;
                    }
                }
            })
            .addCase(updateCartItemQty.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartItemQty.rejected,(state)=>{
                state.isLoading = false;
            })
            // Optimistic update for delete
            .addCase(deleteCartItem.pending,(state, action)=>{
                const { productId } = action.meta.arg;
                if (state.cartItems?.items) {
                    state.cartItems.items = state.cartItems.items.filter(item => item.productId !== productId);
                }
            })
            .addCase(deleteCartItem.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItem.rejected,(state)=>{
                state.isLoading = false;
            })
    }
})

export default userCartSlice.reducer;
export {addToCart, fetchCartItems, updateCartItemQty, deleteCartItem}
