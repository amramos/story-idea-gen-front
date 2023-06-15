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

    const movieButton = (movie) => {
        if (isMovieInUserList(movie.id)) {
            return <Button variant="contained" color="inherit" onClick={() => {removeFromUserList(movie)} }><DeleteForever /> Remove from my stories</Button>
        } else {
            return <Button variant="contained" color="success" onClick={() => {addToUserList(movie)} } ><Add /> Add to my stories</Button>
        }
    }

    function listMovies() {
        return movies.map((movie) => {
            return (
                <div className="col-md-3" style={{marginTop: '10px'}}>
                    <Card key={movies.id} className="h-100">
                        <Card.Header style={{backgroundColor: "white", height: "45px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis'}}>
                            <Card.Title >
                                <div style={{overflow: "hidden", whiteSpace: "nowrap"}}>
                                    <div style={{textOverflow: 'ellipsis'}}>{movie.title}</div>
                                </div>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-center">
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} style={{ height: '220px', width:'160px' }} />
                            </div>   
                            <Card.Text style={{marginTop: "15px", maxHeight: '200px', overflow: "hidden", textOverflow: 'ellipsis'}}> <div style={{textOverflow: 'ellipsis'}}>{movie.overview} </div> </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "white", border: "0px"}}>
                            <div className="text-center" style={{marginBottom:"10px"}}>
                            {movieButton(movie)}
                            </div>
                        </Card.Footer>
                    </Card> 
                </div>
            );
        });
      }

    return (
        <> 
            <h1 style={{marginLeft: '25px'}}>Movies</h1> 
            <div className="row" style={{margin: '15px'}}>
                {handleLoadingState()}
                {handleErrorMessage()}
                {listMovies()}
            </div>
        </>
    );
}

export default Movies;