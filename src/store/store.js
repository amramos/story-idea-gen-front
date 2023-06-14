import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import movieSlice from "./movieSlice";
import movieGenreSlice from "./movieGenreSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice,
        movies: movieSlice,
        movieGenres: movieGenreSlice
    }
});

export default store;