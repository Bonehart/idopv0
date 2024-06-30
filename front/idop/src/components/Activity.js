
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import {handleImageError } from "./../useractions";

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
        <div class="profile-pic">          
          </div> 

          {props.userpage ?    <p class="username">  {props.post.displayName}</p> :
                      <p class="username" onClick={() => {props.getdatafromlistbyuid(props.post.username, props.friendsdata, props.setcurrentfrienduserdata, props.setviewcurrentfrienduserdata, props.setfrienddataview); 
                      }}>  
                      hd  {props.post.displayName}</p>
            }
           
        </div>
    <img src="/option.PNG" class="options" alt=""/> 
    </div>
    <img src="/gil-galad.jpg" class="post-image" alt=""/>
    <div class="post-content">
        {/* <div class="reaction-wrapper">
            <img src="img/like.PNG" class="icon" alt=""/>
            <img src="img/comment.PNG" class="icon" alt=""/>
            <img src="img/send.PNG" class="icon" alt=""/>
            <img src="img/save.PNG" class="save icon" alt=""/>
        </div>  */}

        <p class="description" onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }}>
        <span>{props.post.activity} </span> </p>

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