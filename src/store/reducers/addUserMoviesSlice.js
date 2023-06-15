import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../../enums"

const initialState = {
    response: {},
    responseType: "N",
    loadingStatus: enums.loadingStatus.IDLE,
};

const addUserMoviesSlice = createSlice({
    name: 'addUserMovies',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserMovie.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(addUserMovie.fulfilled, (state, action) => {
                state.response = action.payload;
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(addUserMovie.rejected, (state, action) => {
                state.response = action.payload;
                state.responseType = "E";
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default addUserMoviesSlice.reducer;

export const addUserMovie = createAsyncThunk('movies/addUserMovie', async (movieId, callback) => {
    
    const reqAddMovies = axios.create({
        headers: {
            "Content-Type": 'application/json'
        }
    });
    
    var reqData = new FormData();
    //add three variable to form
    reqData.append("movieId", movieId);
    reqData.append("username", "amramos");
    const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/api";
    var url = [API_URL, "/movie/add"].join("");

    var response = {
        responseType: "N",
        response: ""
    }; 

    reqAddMovies.post(url, reqData)
        .then(() => {
            response = {
                responseType: "S", 
                response: "Movie added to the user's list"
            }
        })
        .catch((error) => {
            response = {
                responseType: "E",
                response: error.response.data.errorMessage
            }
            if (callback) {callback(response.response)}
            return response;
        });
});