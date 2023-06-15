import Movies from "../../components/Movies/Movies";
import StorySearchForm from "./StorySearchForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMovieGenres } from "../../store/reducers/movieGenreSlice";
import { getUserMovies } from "../../store/reducers/userMoviesSlice";

const StorySearch = () => {

    const dispatch = useDispatch();

    dispatch(getMovieGenres());
    dispatch(getUserMovies("amramos"));

    return (
        <>
            <StorySearchForm />
            <Movies />
        </>
    );
}

export default StorySearch;