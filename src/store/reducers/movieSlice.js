import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../../enums"

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
    
    var filteredResults = [];
    let genreFromQuery = query.genre*1;

    results.map(genre => {
        if (genre.genre_ids.includes(99)) {
            alert('99');
        }

        if ((genreFromQuery === 0 || genre.genre_ids.includes(genreFromQuery)) && !genre.genre_ids.includes(99)) {
            filteredResults.push(genre);
        }
    });

    return filteredResults;
});