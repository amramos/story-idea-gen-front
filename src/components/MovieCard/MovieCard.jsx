import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import MovieCardButton from './MovieCardButton';

const MovieCard = (props) => {

    return (
        <Card key={props.movie.id} className="h-100">
            <Card.Header style={{backgroundColor: "white", height: "45px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: 'ellipsis'}}>
                <Card.Title >
                    <div style={{overflow: "hidden", whiteSpace: "nowrap"}}>
                        <div style={{textOverflow: 'ellipsis'}}>{props.movie.title}</div>
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <div className="text-center">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w185/${props.movie.poster_path}`} style={{ height: '220px', width:'160px' }} />
                </div>   
                <Card.Text style={{marginTop: "15px", maxHeight: '200px', overflow: "hidden", textOverflow: 'ellipsis'}}> <div style={{textOverflow: 'ellipsis'}}>{props.movie.genre_ids} {props.movie.overview} </div> </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "white", border: "0px"}}>
                <div className="text-center" style={{marginBottom:"10px"}}>
                    <MovieCardButton isInUserList={props.isInUserList} movieId={props.movie.id}/>
                </div>
            </Card.Footer>
        </Card> 
    )
}

export default MovieCard;