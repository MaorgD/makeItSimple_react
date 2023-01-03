import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { jobs } from '../../../../services/servise';

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



export default function SelectTypeJob(props) {
const selectedJob =props.selectedJob
const setSelectedJob =props.setSelectedJob
const register = props.register

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedJob(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width:1}}>
        <InputLabel id="demo-multiple-checkbox-label">Jobs</InputLabel>
        <Select
                {...register('worker.jobs')}
                labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedJob}
          onChange={handleChange}
          input={<OutlinedInput label="Jobs" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {jobs.map((job) => (
            <MenuItem key={job} value={job}>
              <Checkbox checked={selectedJob.indexOf(job) > -1} />
              <ListItemText primary={job} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}