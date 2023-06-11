import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enums from "../enums/"

const initialState = {
    data: [],
    loadingStatus: enums.loadingStatus.IDLE,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default productSlice.reducer;

export const getProducts = createAsyncThunk('products/get', async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const results = await data.json();
    return results;
});
