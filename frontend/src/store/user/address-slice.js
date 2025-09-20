import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading : false,
    addressList : []
}

const addNewAddress = createAsyncThunk('addresses/addNewAddress', async(formData,thunkAPI)=>{
    try {
            const response = await axios.post(
                `http://localhost:3000/api/user/address/add`,formData
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const fetchAllAddresses = createAsyncThunk('addresses/fetchAllAddresses', async(userId,thunkAPI)=>{
    try {
            const response = await axios.get(
                `http://localhost:3000/api/user/address/get/${userId}`
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const updateAddress = createAsyncThunk('addresses/updateAddress', async({userId,addressId,formData})=>{
    try {
            const response = await axios.put(
                `http://localhost:3000/api/user/address/update/${userId}/${addressId}`,formData
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const deleteAddress = createAsyncThunk('addresses/deleteAddress', async({userId,addressId},thunkAPI)=>{
    try {
            const response = await axios.delete(
                `http://localhost:3000/api/user/address/delete/${userId}/${addressId}`
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const AddressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(addNewAddress.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(addNewAddress.fulfilled,(state,action)=>{
                state.isLoading = false
            })
            .addCase(addNewAddress.rejected,(state)=>{
                state.isLoading = false
            })

            .addCase(fetchAllAddresses.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchAllAddresses.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.addressList = action.payload.data
            })
            .addCase(fetchAllAddresses.rejected,(state)=>{
                state.isLoading = false,
                state.addressList = []
            })
            
            .addCase(updateAddress.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateAddress.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.addressList = action.payload.data
            })
            .addCase(updateAddress.rejected,(state)=>{
                state.isLoading = false,
                state.addressList = []
            })
            .addCase(deleteAddress.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteAddress.fulfilled,(state,action)=>{
                state.isLoading = false,
                state.addressList = action.payload.data
            })
            .addCase(deleteAddress.rejected,(state)=>{
                state.isLoading = false,
                state.addressList = []
            })
    }
});

export default AddressSlice.reducer;
export {addNewAddress,fetchAllAddresses, updateAddress, deleteAddress}