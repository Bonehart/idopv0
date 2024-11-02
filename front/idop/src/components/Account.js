import React, {useState,useContext}  from 'react';
import { app, logInWithEmailAndPassword, logOut } from '../Firebase'
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import {handleImageError } from "./../useractions";
import { Threedots } from './Threedots.js';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";

import { PageContext } from '../PageContext.js';

const auth = getAuth();
export const Account = props => {

    const [authview, setauthview] = useState(auth);
const [loggedout, setloggedout] = useState(false);

    var {currentpost,
        setdetailed,
        sethamburger,
        detailed,
        hamburger,
        modify,
        setmodify,
        setnewtask,
        setaccount,
        account,
        setinteraction} = useContext(PageContext);
  return (
   

    <div class='container'> 


    <div class="account-div">   
        
        <div class="heading-div"> {props.usernm.displayName}</div>
    <div class="account-img"> 
    <img src=" https://picsum.photos/400/200" class="options" alt="" /> 
        
 </div>  

    <button  class="btn" onClick={() => {alert("errrr") }}>Reset Password</button>
        <button  class="btn" onClick={() => {setaccount(!account) }}>Back</button>
        <button  class="btn" onClick={() => {logOut(); setauthview(auth); setloggedout(true); } }>Logout</button>


    </div>           <div class="form-group">
   
           </div>
    
    </div>

  )

}

export default Account;