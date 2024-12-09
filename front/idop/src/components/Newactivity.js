
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

  const maindetailed = {
    display: "flex",
    height: "1000px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };


  
  const fordetailed = {
    display: flex,

        alignitems: "center",
        justifycontent: "center",
        height: "800px",
        width: "66%",

        flexdirection: "column"
    
    };

    const innerthing ={
      width: "45%",
      height: "100%"
      
      };

    const test = {
        height:  "80%",
        width: "80%",
        borderbottomleftradius: "25px",
        borderbottomrightradius: "25px",
        display: "flex",
        alignitems: "center",
        justifycontent: "center"
        };

  return (

      <>

        <NavBar />
          <div style={maindetailed}> 
            <div style={fordetailed}>
              <div className = 'derr1' style={{display:     hamburger == true ? "inline": "none"   }}>

                <DetailedMenu  />  
                </div>

                  <div class ="header">        
                      <div class="hamburger derr" onClick={() => {sethamburger(!hamburger); console.log(hamburger) }}> 
                      <Threedots />
                      </div>
                  </div>
  
                <div style={test}>
  
                    <div class = "inner-image"><img src={"/Images/" +   ".png"}  /> </div>
                        <div style={innerthing}>
                  
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