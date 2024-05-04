import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  './css/login.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {registerWithEmailAndPassword} from "./Firebase.js"
import ResponsiveAppBar from './components/Toolbar.js';

function Newuser() {

  const [vars, setvars] = useState(' ');

  const [passworderror, setpassworderror] = useState(' ');

  const [username, setusername] = useState(' ');
  const [password, setpassword] = useState(' ');
  const [password2, setpassword2] = useState(' ');
  const [registercomplete, setregistercomplete] = useState(false);
  const [isValid, setisValid] = useState(false);
  const [strongRegexpass, setstrongRegexpass] = useState(false);
  const [screenname, setscreenname] = useState(' ');
  
    if (password !== password2 && isValid == true) {
      
      if (passworderror != "Passwords don't match."){
      setpassworderror("Passwords don't match.");
      setisValid(false);
    }
    } else

    {
      if (password == password2 && isValid == false){
        setpassworderror("match");
        setisValid(true);
      }
    }

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password) == true && strongRegexpass == false){
      setstrongRegexpass(true);

    }

    if (strongRegex.test(password) == false && strongRegexpass == true){
      setstrongRegexpass(false);

    }

  if(registercomplete){

    return (

      <div> 
      <p> Thank you for registering</p>
          <Link to="/Home">return home </Link>
      </div>
    )
  } 
     
  return (


 <div class = "body"> 

          <ResponsiveAppBar />

    
    <div class="regcontainer">
      <br/>
    <form>
      <label for="screenname">Enter Username:</label>
      <input id="screenname" type="text" name="screenname" onChange={e => setscreenname(e.target.value)} placeholder="First Name" required />
  
      <label for="username">Enter Email:</label>
      <input id="username" type="email" name="username" onChange={e => setusername(e.target.value)} placeholder="Email" required />
  
      <label for="password">Enter Password:</label>
      <input id="password" type="password" name="password" onChange={e => setpassword(e.target.value)} required />

      <label for="password2"> Re-enter password: </label>
       <input id="password2"  type="password" name="password2"  onChange={e => setpassword2(e.target.value)}></input>
      {isValid && !strongRegexpass ? (
        <p>Password must be at least 6 characters long and contain a capital letter, a number, and a special character.</p>
      ) : null}
      

      {isValid && strongRegexpass ? (
        
      <button type="submit" disabled={!isValid || !strongRegexpass} onClick={e => {
        registerWithEmailAndPassword(screenname, username, password);
        setregistercomplete(true);
      }}>Register</button>
      ) : 
      <button id="no-sub" type="submit" disabled={!isValid || !strongRegexpass} >Register</button>}
      
      {isValid && !strongRegexpass ? null : (
        <p>{passworderror}</p>
      )}
  
    </form>

    <Link to="/">Back </Link>  
  </div>
  
  </div>
    
  );
}

export default Newuser;
