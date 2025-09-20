import { asyncThunkCreator, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading : false,
    ProductList : []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct',
    async(formData,thunkAPI)=>{
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/admin/products/addProduct`,
                formData,
                { 
                    withCredentials: true,
                    headers : {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const viewProducts = createAsyncThunk('/products/viewProducts',
    async(thunkAPI)=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/admin/products/viewProducts`,
                { 
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const editProduct = createAsyncThunk('/products/editProduct',
    async({id, formData},thunkAPI)=>{
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/admin/products/editProduct/${id}`,
                formData,
                { 
                    withCredentials: true,
                    headers : {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async(id,thunkAPI)=>{
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_SERVER}/api/admin/products/deleteProduct/${id}`,
                { 
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const AdminProductSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(viewProducts.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(viewProducts.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.ProductList = action.payload.data;
            })
            .addCase(viewProducts.rejected,(state)=>{
                state.isLoading = false;
                state.ProductList = [];
            })
    }
});

export default AdminProductSlice.reducer;