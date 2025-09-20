import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : [],
    productDetail : null
}

//for getting some products of the selected filter
const viewFilteredProducts = createAsyncThunk('/products/viewFilteredProducts',
    async({filterParams,sortParams},thunkAPI)=>{

        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        });

        try {
            const response = await axios.get(
                `http://localhost:3000/api/user/products/viewProducts?${query}`,
                { 
                    withCredentials: true,
                }
            );
            
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

//for getting product details after clicking on it
const viewProductsDetail = createAsyncThunk('/products/viewProductsDetail',
    async(id)=>{

        try {
            const response = await axios.get(
                `http://localhost:3000/api/user/products/viewProducts/${id}`,
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

//slice
const UserProductSlice = createSlice({
    name : 'userProducts',
    initialState,
    reducers : {
        setProductDetails: (state)=>{
            state.productDetail = null
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(viewFilteredProducts.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(viewFilteredProducts.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(viewFilteredProducts.rejected,(state)=>{
                state.isLoading = false;
                state.productList = [];
            })
            .addCase(viewProductsDetail.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(viewProductsDetail.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.productDetail = action.payload.data;
            })
            .addCase(viewProductsDetail.rejected,(state)=>{
                state.isLoading = false;
                state.productDetail = null;
            })
    }
})


export const {setProductDetails} = UserProductSlice.actions;
export default UserProductSlice.reducer;
export {viewFilteredProducts, viewProductsDetail }
