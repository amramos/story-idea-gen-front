import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import DeleteForever from '@mui/icons-material/DeleteForever';
import reducers from 'store/reducers'
import { useDispatch } from 'react-redux';

const MovieCardButton = (props) => {

    const dispatch = useDispatch();

    const addToUserList = () => {
        dispatch(reducers.addUserMovie(props.movieId, "amramos"));
    }

    const removeFromUserList = () => {
        dispatch(reducers.removeUserMovie(props.movieId, "amramos"));
    }

    if (props.isInUserList) {
        return <Button variant="contained" color="inherit" onClick={() => {removeFromUserList()} }> <DeleteForever /> <div style={{marginLeft: "5px"}} >Remove from my stories</div></Button>
                
    } else {
        return <Button variant="contained" color="success" onClick={() => {addToUserList()} } ><Add /> <div style={{marginLeft: "5px"}} >Add to my stories</div></Button>
    }
}

export default MovieCardButton;