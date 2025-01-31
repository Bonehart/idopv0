import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StyledEngineProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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

export const Newactivity = (props) => {
  const {
    currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction,
  } = useContext(PageContext);

  const sendFile = () => {
    const fileField = document.querySelector('input[type="file"]');
    if (fileField?.files[0]) {
      const formData = new FormData();
      formData.append('image', fileField.files[0]);
      formData.append('user', props.uid);

      fetch('http://localhost:9000/addimage', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log('File upload successful:', data))
        .catch((error) => console.error('Error uploading file:', error));
    } else {
      console.warn('No file selected.');
    }
  };

  const maindetailed = {
    display: 'flex',
    height: '1000px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const fordetailed = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '800px',
    width: '66%',
    flexDirection: 'column'
    
  };

  const innerthing = {
    width: '45%',
    height: '100%',
  };

  const test = {
    height: '80%',
    width: '80%',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const derr1 = {
    display: hamburger ? 'inline' : 'none',
    position: 'absolute',
    zIndex: 1000,
    width: '35%',
    height: '35%',
    backgroundColor: 'white',
  };

  const header = {
    height: '5%',
    width: '80%',
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    // borderLeft: 'solid 1px',
    // borderRight: 'solid 1px',
    // borderTop: 'solid 1px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: "5px"
  };

  return (
    <>
      <NavBar />
      <div style={maindetailed}>
        <div style={fordetailed}>
          <div style={derr1}>
            <DetailedMenu />
          </div>

          <div style={header}>
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

          <div style={test}>
            <div className="inner-image">
              <img src={"/Images/default.png"} alt="Placeholder" />
            </div>
            <div style={innerthing}>
              <div className="inner-content">
                    <ModifyActivityField
                      onChange={props.onChange}
                      onChangeDetail={props.onChangeDetail}
                      modify={true}
                      currentpost={{ activity: ' ', detailed: '' }}
                    />
              </div>
              <div className="inner-placeholder">
                <Button
                  variant="contained"
                  onClick={() => document.getElementById('image').click()}
                >
                  <input hidden type="file" name="image" id="image" /> Image
                </Button>
                <Button variant="contained" onClick={props.onClick}>
                  Write to timeline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newactivity;
