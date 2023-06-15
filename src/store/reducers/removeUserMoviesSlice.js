import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../../enums"

const initialState = {
    loadingStatus: enums.loadingStatus.IDLE,
};

const removeUserMoviesSlice = createSlice({
    name: 'removeUserMovie',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeUserMovie.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(removeUserMovie.fulfilled, (state, action) => {
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(removeUserMovie.rejected, (state, action) => {
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default removeUserMoviesSlice.reducer;

export const removeUserMovie = createAsyncThunk('movies/removeUserMovie', async (movieId, callback) => {
    
    const request = axios.create({
        headers: {
            "Content-Type": 'application/json'
        }
    });
    
    var reqData = new FormData();
    //add three variable to form
    reqData.append("movieId", movieId);
    reqData.append("username", "amramos");
    const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";
    var url = [API_URL, "/movie/remove"].join("");

    var response = {
        responseType: "N",
        response: ""
    }; 

    request.post(url, reqData)
        .then(() => {
            return;
        })
        .catch((error) => {
            return error;
        });

    if (callback) {callback(response.response)}
    return response;
});