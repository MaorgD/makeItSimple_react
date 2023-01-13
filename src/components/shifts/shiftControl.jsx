import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ShiftControl = (props) => {
  const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const days = props.days;
  const setDays = props.setDays;
  const employees = props.workers



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDays(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
 
  return (
    <div className='flex '>
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label">days</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={days}
          onChange={handleChange}
          input={<OutlinedInput label="Jobs" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {allDays.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={days.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button className='bg-indigo-400 rounded-full p-1  '>save shifts</button>

    </div>
  )
}

export default ShiftControl