
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import { handleImageError } from "./../useractions";



export const Hamburger = props => {

    const examplefunc = () => {
    }

    return (


        <div class="hamburger derr" onClick={() => {props.sethamburger(!props.hamburger); console.log(props.hamburger) ;}}> 
                      <Threedots />
                      </div>


    )



}

export default Hamburger;