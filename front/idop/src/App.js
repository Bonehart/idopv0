import { Link } from "react-router-dom";
import './css/index.css';
import 'firebase/compat/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { server } from "./server.js"
import React, { useState, useEffect } from "react";
import { getAuth  } from "firebase/auth";
import { app, logInWithEmailAndPassword, logOut } from './Firebase'

import { useNavigate } from 'react-router-dom';
const auth = getAuth();


export default function App() {
  const [username, setusername] = useState(' ');
  const [loginerror, setloginerror] = useState(' ');
  const [password, setpassword] = useState(' ');
  const [authview, setauthview] = useState(auth);
  const [loggedout, setloggedout] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const firebaseApp = require('./Firebase.js')
  const navigate = useNavigate();

  
if(loading){
  return(
    <p> loading... </p>
  )
}

  return (
 <> 
  <section class="hero">
  {/* <div class="phone">
  <div class="bg">

  </div>
  </div> */}

  <div class="content">
  <br/>
    <div class="form-container">
    {/* <img src="idop.png" class ="idop" alt="" /> */}
    I DO PROCRASTINATION
    <hr/>
    <br/>
    <form>
       <input type="text" placeholder="Phone number, username, or email" onChange={e => setusername(e.target.value)}/>
      <input type="password" placeholder="Password"  onChange={e => setpassword(e.target.value)}/>
      {/* <button onClick={e => {logInWithEmailAndPassword(username, password); } }>Log in</button> */}
      <input type="button" value="Log in" class="btn" onClick={e => {logInWithEmailAndPassword(username, password); } }/>


      <div class="or">
        <hr/>
        <span>OR</span>
        <hr/>
      </div>
      
      <div class="facebook">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
        <a href="#">Log in with Facebook</a>
      </div>
      <div class="forgot">  <p> {loginerror}</p>
        <a href="#">Forgot password?</a>
      </div>    
    </form>
   
   
  </div>
    
    <div class="signup">
      <span>Don't have an account? <Link to="/newuser">Sign up</Link>
</span>
    </div>
    
    <p>Get the app.</p>
    
   <div class="appstore">
     <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" />
     <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" />
   </div>
  </div>
  
</section>


</>
  );
}


