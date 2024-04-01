import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  './css/login.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {registerWithEmailAndPassword} from "./Firebase.js"


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
          <Link to="/">return home </Link>
      </div>
    )
  }
     
  return (

   <div>

     <div class="container">
   
      <label for="screenname">Enter username: </label>
        <input id="screenname" type="text" name="screenname" onChange={e => setscreenname(e.target.value)} placeholder="First Name"></input>

         <label for="username">Enter Email: </label>
        <input id="username" type="text" name="username" onChange={e => setusername(e.target.value)} placeholder="First Name"></input>

       <label for="password"> Enter password: </label>
       <input id="password"  type="password" name="password"  onChange={e => setpassword(e.target.value)} ></input> 
       <label for="password2"> Enter password: </label>
       <input id="password2"  type="password" name="password2"  onChange={e => setpassword2(e.target.value)}></input>

      
      
      { (isValid == true && strongRegexpass == true) ?
      <button onClick={e => {registerWithEmailAndPassword(screenname, username, password);
    setregistercomplete(true) } }> Register </button>
      : <p></p>
      }

      <p> {passworderror}</p>
      <p> {"Rex is : " + strongRegexpass}</p>

    </div>
    </div>
  );
}

export default Newuser;
