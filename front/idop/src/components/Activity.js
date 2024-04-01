
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
    <div className={props.post.image !== "" ? "activity-card" : "activity-card-small"}>
        {/* {props.label}{props.post.image } */}
            <div class="activity-card2">

                {props.userpage ?
                    <h1 class="card-heading-user"> {props.post.displayName}</h1>
                : 
            <h1 class="card-heading" onClick={() => {props.getdatafromlistbyuid(props.post.username, props.friendsdata, props.setcurrentfrienduserdata, props.setviewcurrentfrienduserdata, props.setfrienddataview); props.setviewcurrentfrienduserdata(true);}}>  {props.post.displayName}</h1>
}

            <h2 class="card-heading2" onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }}>            {props.post.activity}</h2>
            <h6 class="card-second-heading">     {preview()}</h6>

    </div>
    <div class="activity-card2">
     
      
      <img class="card-third-div" src={"/Images/" +  props.post.image + ".png"} alt =""  onClick={() => { props.setdetailed(true);  props.setcurrentpost(props.post) }}>

      </img>
    </div>

  </div>

  )

}

export default Activity;