import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Filter.css';
import { useDispatch } from 'react-redux';
import { setFilterCateogry } from '../Redux/Slice/billSlice';

const Filter = () => {
    const [category, setCategory] = React.useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
      const selectedCategory = event.target.value
      setCategory(selectedCategory);
      dispatch(setFilterCateogry(selectedCategory))
    };
  
    return(
        <FormControl sx={{ minWidth: 150}} variant="standard" size="large" >
        <InputLabel  id="demo-simple-select-standard-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"FoodNDining"}>FoodNDining</MenuItem>
          <MenuItem value={"utility"}>Utility</MenuItem>
          <MenuItem value={"shopping"}>Shopping</MenuItem>
          <MenuItem value={"Food & Dining"}>Food & Dining</MenuItem>
          <MenuItem value={"education"}>Education</MenuItem>
          <MenuItem value={"Personal Care"}>Personal Care</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
        </Select>
      </FormControl>
    )
}

export default Filter;