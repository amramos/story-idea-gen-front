import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import enums from "../../enums"

const initialState = {
    data: [],
    loadingStatus: enums.loadingStatus.IDLE,
};

const movieGenreSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovieGenres.pending, (state, action) => {
                state.loadingStatus = enums.loadingStatus.LOADING;
            })
            .addCase(getMovieGenres.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingStatus = enums.loadingStatus.IDLE;
            })
            .addCase(getMovieGenres.rejected, (state, action) => {
                state.loadingStatus = enums.loadingStatus.ERROR;
            })
    }
});

export default movieGenreSlice.reducer;

export const getMovieGenres = createAsyncThunk('movies/getMovieGenres', async () => {

    const reqMoviesDB = axios.create({
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.REACT_APP_THEMOVIEDBKEYBEARER
        }
    });

    var url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'; 
    const response = await reqMoviesDB.get(url);

    let genresWithoutDocumentary = [];

    response.data.genres.map(genre => {
        if (genre.id != 99) {
            genresWithoutDocumentary.push(genre);
        }
    })

    return genresWithoutDocumentary;
});