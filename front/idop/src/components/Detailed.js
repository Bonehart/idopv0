

import ReactDOM from 'react-dom';

import React, { useState,useContext, createContext,useEffect } from "react";


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleImageError } from "./../useractions";

import { NavBar } from './NavBar.js';
import { DetailedMenu } from './DetailedMenu.js';
import { ModifyActivityField } from './ModifyActivityField.js';
import { Threedots } from './Threedots.js';

import { PageContext } from '../PageContext.js';

export const Detailed = props => {

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
                <DetailedMenu  />  
                </div>

                  <div class ="header">        
                      <div class="hamburger derr" onClick={() => {sethamburger(!hamburger); console.log(hamburger) }}> 
                      <Threedots />
                      </div>
                  </div>
  
                <div class = "test">
                    <div class = "inner-image fill"><img src={"/Images/" +  currentpost.image }  /> </div>
                        <div class = "inner-things">
                            <div class = "inner-title">
                            </div>
                            <div class = "inner-content">

                           
                            <ModifyActivityField 
                              modify ={modify}
                              currentpost={currentpost}/> 
               
                              {currentpost.detail} 
                             
                            </div>
                            <div class = "inner-placeholder">
                            </div>
                    </div>
              </div>
            </div>
          </div>

      </>
  
  
    )
}

export default Detailed;