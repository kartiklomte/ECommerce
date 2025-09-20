import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isauthenticated : false,
    isLoading : true,
    user : null
}

//asnc thunk for register (request send from frontend to backend for the save the data in the database)
export const registerUser = createAsyncThunk('/auth/register',
    async(formData,thunkAPI)=>{
        try {
            const response = await axios.post(
                `${process.env.VITE_BACKEND_SERVER}/api/auth/register`,
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

//async thunk for checking the email and password match with the saved email and password in the database
export const loginUser = createAsyncThunk('/auth/login',
    async(formData,thunkAPI)=>{
        try {
            const response = await axios.post(
                `${process.env.VITE_BACKEND_SERVER}/api/auth/login`,
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

//async thunk for the auth middleware so the the once anyone login then he should should be stay login until he himself log out. he should stay login if he refreshes the page 
export const chechAuth = createAsyncThunk('/auth/checkauth',
    async(thunkAPI)=>{
        try {
            const response = await axios.get(
                `${process.env.VITE_BACKEND_SERVER}/api/auth/checkauth`,
                { 
                    withCredentials: true,
                    headers : {
                        'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
                    } 
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const logoutUser = createAsyncThunk('/auth/logout',
    async(thunkAPI)=>{
        try {
            const response = await axios.post(
                `${process.env.VITE_BACKEND_SERVER}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setUser:(state,action)=>{

        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending, (state)=>{
                state.isLoading=true;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user= null;
                state.isauthenticated=false;
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.user= null;
                state.isauthenticated=false;
            })
            .addCase(loginUser.pending, (state,action)=>{
                console.log(action);
                state.isLoading=true;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user= action.payload.success ? action.payload.user : null ;
                state.isauthenticated= action.payload.success ? true : false;
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.user= null;
                state.isauthenticated=false;
            })
            .addCase(chechAuth.pending, (state,action)=>{
                state.isLoading=true;
            })
            .addCase(chechAuth.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user= action.payload.success ? action.payload.user : null ;
                state.isauthenticated= action.payload.success ? true : false;
            })
            .addCase(chechAuth.rejected,(state,action)=>{
                state.isLoading=false;
                state.user= null;
                state.isauthenticated=false;
            })
            .addCase(logoutUser.fulfilled,(state)=>{
                state.isLoading=false;
                state.user = null ;
                state.isauthenticated= false;
            });
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;