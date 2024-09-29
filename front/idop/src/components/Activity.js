
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import {handleImageError } from "./../useractions";
import { Threedots } from './Threedots.js';

export const Activity = props => {

  const preview = () => {
    try{
      return props.post.detail.split(' ').slice(0, 10).join(' ');
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <> 
    
    <div class="post">
    <div class="info">
        <div class="user">

          {props.userpage ?    <p class="username">   {props.post.displayName}</p> :
                      <p class="username" onClick={() => {props.getdatafromlistbyuid(props.post.username, props.friendsdata, props.setcurrentfrienduserdata, props.setviewcurrentfrienduserdata, props.setfrienddataview); 
                      }}>  
                      {props.post.displayName}</p>
            }
       
        </div>

        <div class ="hamburger"> 
                <svg width="25" height="15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5,14 C6.1045695,14 7,13.1045695 7,12 C7,10.8954305 6.1045695,10 5,10 C3.8954305,10 3,10.8954305 3,12 C3,13.1045695 3.8954305,14 5,14 Z" id="shape-03" fill="#030819">
                  </path>
                          <path d="M12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 Z" id="shape-02" fill="#030819">
                  </path>
                          <path d="M19,14 C20.1045695,14 21,13.1045695 21,12 C21,10.8954305 20.1045695,10 19,10 C17.8954305,10 17,10.8954305 17,12 C17,13.1045695 17.8954305,14 19,14 Z" id="shape-01" fill="#030819">
                  </path>
        </svg>
</div>



    <img src="/option.PNG" class="options" alt="" /> 
    </div>


    <img src={"/Images/" +  props.post.image + ".png"} class="post-image" alt="" onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }} />
    <div class="post-content">

        <p class="description" onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }}>
        {props.label}
        <span>{props.post.activity} </span>
        <span>{props.post.activitydetail} </span>
        </p>

        
        <p class="description" onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }}>

       {preview()}    </p>
     
        <p class="post-time">2 minutes ago</p>
    </div>
    <div class="comment-wrapper">
        <img src="/friend-requests.png" class="icon" alt=""/>
        <input type="text" class="comment-box" placeholder="Add a comment" />
        <button class="comment-btn">post</button>
    </div>
    </div>
</>
  )

}

export default Activity;