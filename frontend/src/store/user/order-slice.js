import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    approvalURL : null,
    isLoading : false,
    orderId : null
};

const createNewOrder = createAsyncThunk('/order/createNewOrder',async(orderData)=>{
    try {
            const response = await axios.post(
                `http://localhost:3000/api/user/order/create`,orderData,   
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
});

const userOrderSlice = createSlice({
    name : 'userOrder',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(createNewOrder.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
            })
            .addCase(createNewOrder.rejected,(state)=>{
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })
    }
});

export default userOrderSlice.reducer;
export {createNewOrder}