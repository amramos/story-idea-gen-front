import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { getMovies } from '../../store/movieSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';


const StorySearchForm = () => {

    const [filter, setFilter] = useState({
        searchQuery: "",
        genre: 0,
        include_adult: "false",
        language: "en",
        page: "1"
    });

    const updateFilter = (value) => {
        return setFilter((prev) => {
            return {...prev, ...value};
        });
    };

    const handleChange = (
        event,
        newValue,
      ) => {
        updateFilter({genre: newValue});
      };

    const { data: genres, loadingStatus } = useSelector(state => state.movieGenres);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(getMovies(filter));
    }

    const genreComboBox = () => {
        return genres.map((genre) => {
            return (
                <div>
                    <Option value={genre.id}>{genre.name}</Option>
                </div>
            )}
        );
    }

    return (
        <Box
            component="form"
            sx={{
                margin: "20px",
                display: "flex",
                '& > :not(style)': { m: 1 },
                justifyContent: "flex-start"
            }}
            noValidate
            autoComplete="off"
        >
            
            <TextField 
                id="story-title" 
                margin="normal"
                variant="outlined"
                sx={{
                    width: "500px"
                }}
                label="Title"
                onChange={e => updateFilter({searchQuery: e.target.value})} 
            />
            <Select 
                id="genres"
                margin="normal" 
                label="Genre" 
                variant="outlined"
                sx={{
                    width: "300px"
                }} 
                onChange={handleChange}
                defaultValue={0}
            >
                <Option value={0}>Any</Option>
                {genreComboBox()}   
            </Select>
            <Button onClick={(e) => {onSubmit(e)}} >Search</Button>
        </Box>
    )

}

export default StorySearchForm;