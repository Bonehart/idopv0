
import Grid from '@mui/material/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StyledEngineProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useFilePicker } from 'use-file-picker';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const Newactivity = props => {


  const sendFile = () => {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('image', fileField.files[0]);
    formData.append('user', props.uid);

    console.log(fileField.files[0]);

    fetch('http://localhost:9000/addimage', {
      method: 'POST',
      mode: 'cors',

      body: formData
    })
      ;
  }

  return (
    <div class="body">

      <div class = 'new-post'> 

      <h2 class="card-heading">            Today's Activity</h2>
      <input type="text" class="new-text-box2" onChange={props.onchange} placeholder="New Activity Title"  id="fname" name="fname"></input>
      <TextField  style ={{width: '100%'}}
                  id ="activitydetail"
                  variant="outlined" 
                  multiline
                  minRows = {20}
                  maxRows={20}
                  onChange={props.onchangedetail}
                  margin="normal"
                  placeholder="Enter details about activity"
                  />

              <Button variant="contained"  type="submit"  onClick={()=>(document.getElementById('image').click())} >  <input hidden type="file" name="image" id ="image"/> Image </Button>
              <Button variant="contained" onClick={props.onclick} >Write to time line</Button>
              <Button variant="contained" onClick={props.back} >
                Back
              </Button>

   

      </div>
    
    </div>


  )

}

export default Newactivity;