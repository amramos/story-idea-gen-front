import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../enums/"

const initialState = {
    data: [],
    loadingStatus: enums.loadingStatus.IDLE,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default movieSlice.reducer;

export const getMovies = createAsyncThunk('movies/get', async (query) => {
    
    const reqMoviesDB = axios.create({
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.REACT_APP_THEMOVIEDBKEYBEARER
        }
    });
    
    var parameter = query.searchQuery.replace(" ", "%");
    var url = `https://api.themoviedb.org/3/search/movie?query=${parameter}&include_adult=${query.include_adult}&language=${query.language}&page=${query.page}`; 
    var response = await reqMoviesDB.get(url);

    var results = response.data.results;
    
    if (!query.genre) {
        filteredResults = results;
    } else {
        var filteredResults = [];
        for (var i = 0; i < results.length; i++) {
            if (results[i].genre_ids.includes(query.genre*1)) {
                filteredResults.push(results[i]);
            }
        }
    }

    return filteredResults;
});