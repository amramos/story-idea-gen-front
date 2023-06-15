import { useSelector } from "react-redux";
import MovieCard from '../../components/MovieCard/MovieCard';

const MyStories = () => {

    const { data: userMovies, loadingStatus } = useSelector(state => state.getUserMovies);
    
    const listMyStories = () => {
        return userMovies.map((movie) => {
            return (
                <div className="col-md-3" style={{marginTop: '10px'}}>
                    <MovieCard movie={movie} isInUserList="false"/>
                </div>
            );
        });
    }

    return (
        <>
            
            <div className="row" style={{margin: '15px'}}>
                <h2>My stories</h2> 
                {listMyStories()}
            </div>
        </>
    );
}

export default MyStories;