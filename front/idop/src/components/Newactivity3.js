import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Horizontal dots icon
import { PageContext } from '../PageContext.js';


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

const   derr1 = {
  display: hamburger ? 'inline' : 'none',
   position: 'absolute',
   zIndex: 1000,
   width: '25%',
   height: '25%',
  backgroundColor: 'white',
};

  const styles = {
      container: {
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#fafafa',
      height: "1200px"
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 150px)', // Corrected property
      gridAutoRows: '50px',                         // Corrected property
      gap: '5px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Roboto', sans-serif",
      width: '800px',
      height: '800px',
    },

    hamburger: {
      marginright: "25px"
      },
    
    
    header: {
      gridRowStart: 1,
      gridRowEnd: 1,
      gridColumnStart: 1,
      gridColumnEnd: 6,
      backgroundColor: '#833ab4',
      color: '#ffffff',
      padding: '15px',
      fontWeight: 'bold',
      fontSize: '18px',
      borderRadius: '10px 10px 0 0',
      position: 'relative', // Allows absolute positioning of child elements
      display: 'flex',
      justifyContent: 'center', // Center the header text
    
    },

    activity: {
      gridRowStart: 9,
      gridRowEnd: 14,
      gridColumnStart: 1,
      gridColumnEnd: 6,
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      padding: '10px',
    },
 
    buttons: {
      gridRowStart: 14,
      gridRowEnd: 16,
      gridColumnStart: 1,
      gridColumnEnd: 6,
      display: 'flex',
      justifyContent: 'space-around',
    },

    hamburgerMenu: {
      position: 'absolute',
      top: '10px',
      right: '10px', // Moves the icon to the right edge
    },
    image: {
      gridRowStart: 2,
      gridRowEnd: 9,
      gridColumnStart: 2,
      gridColumnEnd: 5,
      backgroundColor: '#fafafa',
      border: '1px solid #ddd',
      borderRadius: '10px',
   
    },
  
    button: {
      backgroundColor: '#405de6',
      color: '#ffffff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.3s',
      margin: "15px"
    },
    buttonHover: {
      filter: 'brightness(1.2)',
    }
   

  };

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>

      <div style={derr1}>
            <DetailedMenu />
      </div>


        <div style={styles.header}>
          Create New Activity
     
        </div>



        <div style={styles.image}>Image Placeholder</div>
        <div style={styles.activity}>Activity Overview

        <ModifyActivityField
                      onChange={props.onChange}
                      onChangeDetail={props.onChangeDetail}
                      modify={true}
                      currentpost={{ activity: ' ', detailed: '' }}
                    />
        </div>
        {/* <div style={styles.activityDetailed}>Detailed Activity</div> */}
        <div style={styles.buttons}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.filter = styles.buttonHover.filter)}
            onMouseOut={(e) => (e.target.style.filter = 'none')}
          >
            Save
          </button>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.filter = styles.buttonHover.filter)}
            onMouseOut={(e) => (e.target.style.filter = 'none')}
          >
            Cancel 
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default Newactivity;
