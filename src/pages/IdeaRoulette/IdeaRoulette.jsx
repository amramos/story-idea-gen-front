import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import RotateRight from '@mui/icons-material/RotateRight';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";

const IdeaRoulette = () => {

    const categories = ["Character", "Plot", "Theme", "Genre"];

    const [shouldPlayRoulette, setShouldPlayRoulette] = useState(false);

    const { data: userMovies, loeadingStatusUserMovies } = useSelector(state => state.getUserMovies);

    const playRoulette = () => {
        setShouldPlayRoulette(true);
    }

    useEffect(() => {
        if (shouldPlayRoulette) {
            setShouldPlayRoulette(false);
        }

    }, [shouldPlayRoulette]);

    const Roulette = () => {

        return categories.map(category => {
            return (<div>
                <h2> {category} </h2>
                <h2> {userMovies[Math.floor(Math.random() * userMovies.length)].title} </h2>
            </div>)
        });
    }

    return (
        <>
            <h1>Idea Roulette</h1>
            <Button variant="contained" color="success" onClick={() => { playRoulette() }} style={{ marginRight: "10px" }} ><RotateRight /> Play roulette!</Button>
            <div className="row" style={{ margin: '15px' }}>
                <Roulette />
            </div>
        </>
    )
}

export default IdeaRoulette;