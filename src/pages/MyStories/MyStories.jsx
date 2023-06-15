import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeUserMovie } from '../../store/reducers/removeUserMoviesSlice';
import { getUserMovies } from '../../store/reducers/userMoviesSlice';

const MyStories = () => {

    const dispatch = useDispatch();
    const { data: cartProducts, loadingStatus } = useSelector(state => state.getUserMovies);
    const [ userMoviesListUpdated, setUserMoviesListUpdated ] = useState(false);
    
    const updateMoviesList = () => {
        setUserMoviesListUpdated(true);
    };

    const removeFromCart = (movieId) => {
        dispatch(removeUserMovie(movieId, "amramos"));
        setTimeout(() => {
            updateMoviesList();
        }, 200);
    }

    useEffect(() => {
        if (userMoviesListUpdated) {
            dispatch(getUserMovies("amramos"));
            setUserMoviesListUpdated(false);
        }
    }, [userMoviesListUpdated]);

    const listCartProducts = () => {
        return cartProducts.map((movie) => {
            return (
                <div className="col-md-3" style={{marginTop: '10px'}}>
                    <Card key={movie.id} className="h-100">
                        <div className="text-center">
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} style={{ height: '220px', width:'160px' }} />
                        </div>   
                        <Card.Body>
                            <div className="text-center">
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text style={{marginTop: "15px", maxHeight: '200px', overflow: "hidden", textOverflow: 'ellipsis'}}> <div style={{textOverflow: 'ellipsis'}}>{movie.overview} </div> </Card.Text>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className="text-center">
                            <Button variant="danger" onClick={() => {removeFromCart(movie.id)} }><img src="https://www.svgrepo.com/download/78963/rubbish-bin.svg" height="20px" width="20px"></img> Remove</Button>
                            </div>
                        </Card.Footer>
                    </Card> 
                </div>
            );
        });
      }

    return (
        <>
            <h1>My stories</h1> 
            <div className="row">
                {listCartProducts()}
            </div>
        </>
    );
}

export default MyStories;