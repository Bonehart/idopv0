
import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleImageError } from "./../useractions";

import { useEffect, useRef, useState } from 'react';

export const ModifyActivityField = props => {

    return (
      // if modify is clicked //
      props.modify ? (
        <>        
        <h2 class="card-heading"> {props.currentpost.activity}</h2>
        <textarea   id="activity" 
                style={{
                  width: '100%', 
                  height: '20%',
                  htmlFontSize: 10,
                  backgroundColor: 'white',
          
                  outline: 'none',
                  resize: 'vertical',
                  color: 'inherit',
                  font: 'inherit',
                    overflow: 'auto'
        }}>
                        {props.currentpost.activity} 
        </textarea>
        <textarea   id="activitydetail" 
            
            style={{
              width: '100%', 
              height: '70%',
              htmlFontSize: 10,
              backgroundColor: 'white',
      
              outline: 'none',
              resize: 'vertical',
              color: 'inherit',
              font: 'inherit',
                overflow: 'auto'
            }}
            >

                            {props.currentpost.detail} 
            </textarea>


            </>
      )
      :(
          <div>
            <h2 class="card-heading">  {props.currentpost.activity}</h2>
          </div>
        )
    )
}

export default ModifyActivityField;