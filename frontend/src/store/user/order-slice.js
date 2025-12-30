import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    approvalURL : null,
    isLoading : false,
    orderId : null
};

const createNewOrder = createAsyncThunk('/order/createNewOrder',async(orderData, thunkAPI)=>{
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/user/order/create`, orderData,
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export async function createRazorpayCheckoutOrder(orderData) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/user/order/create-razorpay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('createRazorpayCheckoutOrder failed');
  return res.json();
}

export async function createRazorpayOrder(amount, receiptId) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/payments/razorpay/order` , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, receiptId }),
  });
  if (!res.ok) throw new Error('createRazorpayOrder failed');
  return res.json();
}

export function openRazorpayCheckout({ keyId, orderId, amount, name, description, handler, prefill = {} }) {
  if (!window.Razorpay) throw new Error('Razorpay script not loaded. Add script in index.html');
  if (!keyId) throw new Error('Missing Razorpay key id. Set VITE_RAZORPAY_KEY_ID in frontend .env');
  const options = { key: keyId, amount, currency: 'INR', name, description, order_id: orderId, handler, prefill, theme: { color: '#F37254' } };
  const rzp = new window.Razorpay(options);
  rzp.open();
}

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
