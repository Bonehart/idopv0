import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  './css/loginpage.css';
// import { Provider } from 'react-redux'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { app, logInWithEmailAndPassword, logOut } from './Firebase'
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ResponsiveAppBar from './components/Toolbar.js';
const auth = getAuth();
const firebaseApp = require('./Firebase.js')

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};

function Login() {

  const [username, setusername] = useState(' ');
  const [loginerror, setloginerror] = useState(' ');
  const [password, setpassword] = useState(' ');
  const [authview, setauthview] = useState(auth);
  const [loggedout, setloggedout] = useState(false);
  const [user, loading, error] = useAuthState(auth);

const navigate = useNavigate();

if(loading){
  return(
    <p> loading... </p>
  )
}

if(loggedout){
  return(
<div>  
    <p> Thank you for using... </p>
    <p onClick ={ e => setloggedout(false)}> Log back in </p>
    </div> 
  )
}

return (

<>
  <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono" rel="stylesheet"/>

<div id="wrapper">
  <div class="main-content">
     <div class="header"> 
     <img src="idop.png" class="brand-img" alt="" />

     </div> 
    <div class="l-part">
      <input type="text"  id="username"  placeholder="Username" class="input-1" onChange={e => setusername(e.target.value)} />
      <div class="overlap-text">
        <input type="password" id="password" placeholder="Password"  onChange={e => setpassword(e.target.value)} class="input-2" />
        <a href="#">Forgot?</a>
      </div>
      <input type="button" value="Log in" class="btn" onClick={e => {logInWithEmailAndPassword(username, password); } }/>

    </div>
    <p> {loginerror}</p>
  </div>

  <div class="sub-content">
    <div class="s-part">
      Don't have an account?<a href="#">Sign up</a>
    </div>
  </div>
</div>


</>
  );
}

export default Login;
