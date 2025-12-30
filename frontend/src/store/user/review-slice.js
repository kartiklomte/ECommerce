import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchProductReviews',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/user/reviews/product/${productId}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed' });
    }
  }
);

export const addOrUpdateReview = createAsyncThunk(
  'reviews/addOrUpdateReview',
  async ({ productId, rating, comment }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/user/reviews/add`,
        { productId, rating, comment },
        { withCredentials: true }
      );
      // refresh list
      thunkAPI.dispatch(fetchProductReviews(productId));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed' });
    }
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, rating, comment, productId }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/user/reviews/${reviewId}`,
        { rating, comment },
        { withCredentials: true }
      );
      // refresh list
      if (productId) thunkAPI.dispatch(fetchProductReviews(productId));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed' });
    }
  }
);

const reviewSlice = createSlice({
  name: 'userReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload?.data || [];
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload?.message || 'Failed';
      })
      .addCase(addOrUpdateReview.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed';
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed';
      });
  },
});

export default reviewSlice.reducer;