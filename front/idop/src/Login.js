import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  './css/login.css';
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
<div class ="body"> 
<ResponsiveAppBar />


<br>
</br>
  

<p> Login</p>
      <div class="container">
      <div class="account-card">
        
				<div class="form-group">
        <label for="username">Enter name: </label>
         <input id="username" type="text" name="username" onChange={e => setusername(e.target.value)} placeholder="User name"></input>
         </div>

				<div class="form-group">
        <label for="password"> Enter password: </label>
        <input id="password"  type="password" name="password"  onChange={e => setpassword(e.target.value)} ></input> 
        </div>

        <div class="form-group">
        <button onClick={e => {logInWithEmailAndPassword(username, password); } }> Login </button>

        </div>
        <div class="form-group">
        <button onClick={e => {logOut(); setauthview(auth); setloggedout(true); } }> Logout </button>
        </div>
        <Link to="/">Back </Link>  

     
       <p> {loginerror}</p>
     </div>
    </div>

    </div>
  );
}

export default Login;
