import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  './css/login.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {registerWithEmailAndPassword} from "./Firebase.js"
import ResponsiveAppBar from './components/Toolbar.js';
import { getuserData, sendFilenoimage, deletedatabyid, deleteimagebyid, handlepreview, addfrienddb, getfriendsdata, getdatafromlistbyuid, handleImageError } from "./useractions";

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

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*/])(?=.{8,})");


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

<body>
  <div id="SignupContainer">
    <div class="signupBox">
      <header>
        <h2>IDOP</h2>
        <p>SIGN UP AND WASTE TIME</p>
        {/* <button><i class="fab fa-facebook"></i>Log in with Facebook</button> */}
      </header>
      <div class="seperator">
        {/* <hr />OR
        <hr /> */}
      </div>
      <form action="#">
    
        <input type="text" name="screenname" onChange={e => setscreenname(e.target.value)}  placeholder="Username" />
        <input type="text" name="username" onChange={e => setusername(e.target.value)} placeholder="Email" />

        <input type="password" id="password"  name="password" onChange={e => setpassword(e.target.value)} required placeholder="Password"/>
        <input id="password2"  type="password" name="password2"  placeholder="Re-enter Password" onChange={e => setpassword2(e.target.value)}></input>
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
                {/* <button  id="no-sub" type="submit" disabled={!isValid || !strongRegexpass}>Sign up</button> */}
        
        {isValid && !strongRegexpass ? null : (
          <p>{passworderror}</p>
        )}
    
{/*   
        <button type="button" disabled>Sign up</button> */}

      </form>
      <footer>
        <p>
          By signing up, you agree to <a href="#">Waste</a> and <a href="#">Time</a> .
        </p>
      </footer>
    </div>
  </div>
  <div id="BottomContainer">
    <p>
      Have an account? <a href="#">Log in</a>
    </p>
  </div>
  <div id="AppsContainer">
    <p></p>
    {/* <img src="https://i.postimg.cc/Vkm7D9Xd/appstore.png" alt="appstore" />
    <img src="https://i.postimg.cc/R00gzMsm/playstore.png" alt="playstore" /> */}
  </div>
  <div id="LastContainer">
    <div class="links">
      <a href="#">WASTE YOUR TIME</a>

    </div>
    <div class="copyright">
      <p>DON'T WASTE TIME FRIEND
      </p>
    </div>
  </div>
</body>


 
    
  );
}

export default Newuser;
