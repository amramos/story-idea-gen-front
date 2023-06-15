import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import enums from "../../enums"
import { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import { addUserMovie } from '../../store/reducers/addUserMoviesSlice';
import Add from '@mui/icons-material/Add';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { getUserMovies } from '../../store/reducers/userMoviesSlice';
import { removeUserMovie } from '../../store/reducers/removeUserMoviesSlice';
import MovieCard from 'components/MovieCard/MovieCard';

const Movies = () => {
    const { data: movies, loadingStatus } = useSelector(state => state.movies);
    //const { response, responseType } = useSelector(state => state.addUserMovie);
    const { data: userMovies, loeadingStatusUserMovies }  = useSelector(state => state.getUserMovies);
    
    const [ userMoviesListUpdated, setUserMoviesListUpdated] = useState(false);

    useEffect(() => {
        if (userMoviesListUpdated) {
            dispatch(getUserMovies("amramos"));
            setUserMoviesListUpdated(false);
        }
    }, [userMoviesListUpdated]);

    // this is a test, create a slice later
    const [ errorMessage, setErrorMessage] = useState();
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const dispatch = useDispatch();

    const setAddErrorMessage = (errorMessage) => {
        setErrorMessage(errorMessage);
    }

    const addToUserList = (movie) => {
        dispatch(addUserMovie(movie.id));
        setTimeout(() => {
            updateMoviesList();
        }, 300);
    }

    const removeFromUserList = (movie) => {
        dispatch(removeUserMovie(movie.id, "amramos"));
        setTimeout(() => {
            updateMoviesList();
        }, 200);
    }

    const updateMoviesList = () => {
        setUserMoviesListUpdated(true);
    };

    const handleLoadingState = () => {
        
        if (loadingStatus === enums.loadingStatus.LOADING) {
            return <div className="text-center"><Spinner  animation="border" variant="primary"/></div>
        }
        
        if (loadingStatus === enums.loadingStatus.ERROR) {
            return  <Alert variant="danger">
                        Something went wrong. Please try again later.
                    </Alert>
        }

        return;
    }

    const handleErrorMessage = () => {
            return (
                {errorMessage} &&
                <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="close-modal-title">
                    <ModalDialog>
                        <ModalClose />
                        <Typography style={{margin: "20px"}}>{errorMessage}</Typography>
                    </ModalDialog>
                </Modal>
            );
        
    }

    const isMovieInUserList = (movieId) => {
        var isMovieInList = false;
        for (var i = 0; (i < userMovies.length) && !isMovieInList; i++) {
            if (userMovies[i].id === movieId) {
                isMovieInList = true;
            }
        }
        return isMovieInList;
    }

    function listMovies() {
        return movies.map((movie) => {
            return (
                <div className="col-md-3" style={{marginTop: '10px'}}>
                    <MovieCard movie={movie} isInUserList={isMovieInUserList(movie.id)}/>
                </div>
            );
        });
      }

    return (
        <>  
            <div className="row" style={{margin: '15px'}}>
                <h2 >Movies</h2>
                {handleLoadingState()}
                {handleErrorMessage()}
                {listMovies()}
            </div>
        </>
    );
}

export default Movies;