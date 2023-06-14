import Movies from "../../components/Movies/Movies";
import StorySearchForm from "./StorySearchForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMovieGenres } from "../../store/movieGenreSlice";

const StorySearch = () => {

    const dispatch = useDispatch();


    dispatch(getMovieGenres());


    return (
        <>
            <StorySearchForm />
            <Movies />
        </>
    );
}

export default StorySearch;