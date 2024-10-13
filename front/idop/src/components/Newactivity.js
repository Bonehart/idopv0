
import Grid from '@mui/material/Grid';
import {React,useContext,createContext} from 'react';
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

import { NavBar } from './NavBar.js';
import { DetailedMenu } from './DetailedMenu.js';
import { ModifyActivityField } from './ModifyActivityField.js';
import { Threedots } from './Threedots.js';

import { PageContext } from '../PageContext.js';
export const Newactivity = props => {
  const examplefunc = () => {
  }
  var {currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction} = useContext(PageContext);
  // var { currentpost,setdetailed, setmodify, sethamburger,detailed, setDetailed, hamburger, setHamburger, modify, setModify } = useContext(PageContext);

  const sendFile = () => {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('image', fileField.files[0]);
    formData.append('user', props.uid);
    fetch('http://localhost:9000/addimage', {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
      ;
  }

  return (
    // <div class="body">
    //   <div class = 'new-post'> 
    //   <h2 class="card-heading">            Today's Activity</h2>
    //   <input type="text" class="new-text-box2" onChange={props.onchange} placeholder="New Activity Title"  id="fname" name="fname"></input>
    //   <TextField  style ={{width: '100%'}}
    //               id ="activitydetail"
    //               variant="outlined" 
    //               multiline
    //               minRows = {20}
    //               maxRows={20}
    //               onChange={props.onchangedetail}
    //               margin="normal"
    //               placeholder="Enter details about activity"
    //               />

    //           <Button variant="contained"  type="submit"  onClick={()=>(document.getElementById('image').click())} >  <input hidden type="file" name="image" id ="image"/> Image </Button>
    //           <Button variant="contained" onClick={props.onclick} >Write to time line</Button>
    //           <Button variant="contained" onClick={props.back} >
    //             Back
    //           </Button>
    //   </div>
      <>

        <NavBar />
          <div class = "main-detailed"> 
            <div class = "for-detailed">
              <div className = 'derr1' style={{display:     hamburger == true ? "inline": "none"   }}>

                <DetailedMenu  />  
                </div>

                  <div class ="header">        
                      <div class="hamburger derr" onClick={() => {sethamburger(!hamburger); console.log(hamburger) }}> 
                      <Threedots />
                      </div>
                  </div>
  
                <div class = "test">
                  New activity
                    <div class = "inner-image fill"><img src={"/Images/" +   ".png"}  /> </div>
                        <div class = "inner-things">
                            <div class = "inner-title">
                            </div>
                            <div class = "inner-content">
                           
                            <ModifyActivityField 
                            onchange={props.onchange}
                            onchangedetail={props.onchangedetail}
                            modify ={true}
                            currentpost={{"activity" : " ", "detailed": "" }}
                            />                               
                            </div>
                            <div class = "inner-placeholder">
                                       <Button variant="contained"  type="submit"  onClick={()=>(document.getElementById('image').click())} >  <input hidden type="file" name="image" id ="image"/> Image </Button>
                                 <Button variant="contained" onClick={props.onclick} >Write to time line</Button>

                            </div>
                    </div>
              </div>
            </div>
          </div>

      </>
   


  )

}

export default Newactivity;