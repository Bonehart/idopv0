import Grid from '@mui/material/Grid';
import { React, useContext, createContext } from 'react';
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
import {  sendFilenoimage, updatepost } from "../useractions";


import { PageContext } from '../PageContext.js';

export const Interaction = (props) => {


  var {currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction} = useContext(PageContext);

  const sendFile = () => {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('image', fileField.files[0]);
    formData.append('user', props.uid);
    fetch('http://localhost:9000/addimage', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
  };

  return (
    <>
      <NavBar />
      <div className="main-detailed">
        <div className="for-detailed">
          <div
            className="derr1"
            style={{ display: hamburger === true ? 'inline' : 'none' }}
          >
            <DetailedMenu />
          </div>
          <div className="header">
   
            <div
              className="hamburger derr"
              onClick={() => {
                sethamburger(!hamburger);
                console.log(hamburger);
              }}
            >
              <Threedots />
            </div>
          </div>
          <div className="test">
            <div className="inner-image fill">
              <img src={"/Images/" +  currentpost.image } alt="Activity" />
            </div>
            <div className="inner-things">
              <div className="inner-title">
                {props.variant == 'new' || props.variant == 'modify' ? (
                        <> </>
                ) : (
                    currentpost.activity)
                }
              </div>
              <div className="inner-content">
                {props.variant === 'new' ? (
                  <ModifyActivityField
                    modify={true}
                    currentpost={{ activity: 'NEW ', detailed: 'NEW DETAILED' }}
                  />
                ) : props.variant === 'modify' ? (

 
                    <ModifyActivityField
                      modify={true} 
                      currentpost={currentpost} 
                    />
                  )
                
                : (
                  <>

                    {currentpost.detail}
                  </>
                )}
              </div>


              <div className="inner-placeholder">
                {props.variant === 'new' ? (
                  <ModifyActivityField
                    modify={false} // Indicate it's a new post
                    currentpost={{ activity: ' ', detailed: '' }} // Empty post for a new activity
                  />
                ) : props.variant === 'modify' ? (
                    <> 
                    <Button variant="contained" onClick={() => {

                        updatepost(
                                    document.getElementById('activity').value,
                                    document.getElementById('activitydetail').value, currentpost._id);
                                    setmodify(false);
                                    setdetailed(false);
                        }} >Save changes

                        </Button>

                        <Button variant="contained" type="submit" onClick={() => (document.getElementById('image').click())} >
                            <input hidden type="file" name="image" id="image"  onChange={() => {      sendFilenoimage(
                                        document.getElementById('activity').value,
                                        document.getElementById('activitydetail').value, currentpost._id); }}/>Modify Image
                        </Button>
                        </>
                ) : (

                  <>
      
                buttons
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interaction;
