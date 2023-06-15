import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import movieGenreSlice from "./reducers/movieGenreSlice";
import addUserMoviesSlice from "./reducers/addUserMoviesSlice";
import userMoviesSlice from "./reducers/userMoviesSlice";
import removeUserMoviesSlice from "./reducers/removeUserMoviesSlice";

const store = configureStore({
    reducer: {
        movies: movieSlice,
        movieGenres: movieGenreSlice,
        addUserMovie: addUserMoviesSlice,
        getUserMovies: userMoviesSlice,
        removeUserMovie: removeUserMoviesSlice,
    }
});

export default store;