
import React, {useContext}  from 'react';
import ReactDOM from 'react-dom';
import { PageContext } from '../PageContext.js';
import '../css/navbar.css';

export const Leftnav = props => {
  
 
     
    


    return (

        <div>
 
  <ul class="sidebar-menu">
    <br/>
    <br/>
    <br/>
    <li>
      <a href="#" class="nav-link" onClick={() => { props.setarticles(false);  }}>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" aria-label="Home" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="2px"></path>
          </svg>
        </span>
        Home
      </a>
    </li>
   
    <li>
      <a href="#" class="nav-link" onClick={() => { props.setnewtask(!props.newtask);  }}>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" aria-label="New post" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px"></path>
            <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
            <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
          </svg>
        </span>
        New Post
      </a>
    </li>
    <li>
      <a href="#" class="nav-link active">
        <img class="icon rounded-circle" src="user.png"  alt="Profile icon"/>
        Profile
      </a>
    </li>
    <li>
      <a href="#" class="nav-link active"  onClick={() => { props.setarticles(true);  }}>
        <img class="icon rounded-circle" src="friend-requests.png"  alt="Profile icon"/>
        Find Articles
      </a>
    </li>
  </ul>


</div>
   
    )
}

export default Leftnav;