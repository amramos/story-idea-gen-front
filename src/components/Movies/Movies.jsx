import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/cartSlice"
import Spinner from 'react-bootstrap/Spinner';
import enums from "../../enums"

const Movies = () => {
    const { data: movies, loadingStatus } = useSelector(state => state.movies);

    const dispatch = useDispatch();

    const addToUserList = (product) => {
        dispatch(add(product));
    }

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
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} style={{ height: '130px', width:'100px' }} />
                            </div>   
                            <Card.Text style={{marginTop: "15px", maxHeight: '200px', overflow: "hidden", textOverflow: 'ellipsis'}}> <div style={{textOverflow: 'ellipsis'}}>{movie.overview} </div> </Card.Text>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "white", border: "0px"}}>
                            <div className="text-center">
                            <Button variant="primary" onClick={() => {addToUserList(movie)} }>Add to my list</Button>
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
                {listMovies()}
            </div>
        </>
    );
}

export default Movies;