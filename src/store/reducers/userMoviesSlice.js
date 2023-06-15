import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../../enums/"

const initialState = {
    data: [],
    loadingStatus: enums.loadingStatus.IDLE,
};

const userMoviesSlice = createSlice({
    name: 'userMovies',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserMovies.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(getUserMovies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(getUserMovies.rejected, (state, action) => {
                state.data = action.payload;
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default userMoviesSlice.reducer;

export const getUserMovies = createAsyncThunk('movies/getUserMovies', async () => {
    
    const reqGetUserMovies = axios.create({
        headers: {
            "Content-Type": 'application/json'
        }
    });
    
    var reqData = new FormData();
    reqData.append("username", "amramos");
    
    const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";
    var url = `${API_URL}/movie/getAll`;

    const response = await reqGetUserMovies.post(url, reqData);

    return response.data;
});