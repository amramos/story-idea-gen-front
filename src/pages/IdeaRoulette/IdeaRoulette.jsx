import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import RotateRight from '@mui/icons-material/RotateRight';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";

const IdeaRoulette = () => {

    const categories = ["Character", "Plot", "Theme", "Genre"];

    const [ shouldPlayRoulette, setShouldPlayRoulette ] = useState(false);

    const { data: userMovies, loeadingStatusUserMovies }  = useSelector(state => state.getUserMovies);

    const playRoulette = () => {
        setShouldPlayRoulette(true);
    }

    useEffect(() => {
        if (shouldPlayRoulette) {
            setShouldPlayRoulette(false);
        }
        
    }, [shouldPlayRoulette]);

    const roulette = () => {

        var movies = [];
        var randomElement = 0;

        for (var i = 0; i < categories.length; i++) {
            randomElement = Math.floor(Math.random() * userMovies.length);
            movies.push({
                category: categories[i],
                movieId: randomElement,
            });
        }

        //alert(JSON.stringify(movies[0]));

        return movies.map((movie) => {(
            <div>
            <h2> {movie.category} </h2>
            <h2> {movie.movieId} </h2>
            </div>
        )});
    }

    return (
        <>
            <h1>Idea Roulette</h1>
            <Button variant="contained" color="success" onClick={() => {playRoulette()}} style={{marginRight:"10px"}} ><RotateRight /> Play roulette!</Button>
            <div className="row" style={{margin: '15px'}}>
                {roulette()}
            </div>
        </>
    )
}

export default IdeaRoulette;