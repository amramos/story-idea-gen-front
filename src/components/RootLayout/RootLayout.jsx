import { Outlet } from 'react-router-dom';
import NavbarPanel from '../NavbarPanel/NavbarPanel';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { useDispatch } from 'react-redux';
import { getMovieGenres } from "../../store/reducers/movieGenreSlice";
import { getUserMovies } from "../../store/reducers/userMoviesSlice";

const RootLayout = () => {

    const dispatch = useDispatch();

    dispatch(getMovieGenres());
    dispatch(getUserMovies("amramos"));

    return (
        <>
            <Provider store={store}>
                <NavbarPanel />

                <main>
                    <Outlet />
                </main>
            </Provider>
        </>
    );
}

export default RootLayout;