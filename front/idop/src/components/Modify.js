

import ReactDOM from 'react-dom';

import React, { useState,useContext, createContext,useEffect,handlepreview } from "react";


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleImageError,updatepost ,sendFilenoimage} from "./../useractions";

import { NavBar } from './NavBar.js';
import { DetailedMenu } from './DetailedMenu.js';
import { ModifyActivityField } from './ModifyActivityField.js';
import { Threedots } from './Threedots.js';

import { PageContext } from '../PageContext.js';

export const Modify = props => {

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
    return (
        <>

    <NavBar />
        <div class = "main-detailed"> 
            <div class = "for-detailed">
              <div className = 'derr1' style={{display:     hamburger == true ? "inline": "none"   }}>
  
              afafafafefevc1111111
                <DetailedMenu 
                // setdetailed = {setdetailed}
                // setmodify = {setmodify}
                // sethamburger={sethamburger}
                // hamburger={hamburger}
                // setexampletext= {props.setexampletext}
                />  
                </div>

                  <div class ="header">        
                      <div class="hamburger derr" onClick={() => {sethamburger(!hamburger); console.log(hamburger) }}> 
                      <Threedots />
                      </div>
                  </div>
  
                <div class = "test">
                    <div class = "inner-image fill"><img src={"/Images/" +  currentpost.image + ".png"}  /> </div>
                        <div class = "inner-things">
                            <div class = "inner-title">
                            </div>

                            <div class = "inner-content">
                                <ModifyActivityField  modify ={modify} currentpost={currentpost}  /> 
                            </div>

                            <div class = "inner-placeholder">
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
                            </div>
                     
                        </div>
                 
                </div>
            </div>
        </div>

      </>
  
  
    )
}

export default Modify;