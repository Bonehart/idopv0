
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import { handleImageError } from "./../useractions";



export const Buttonmenu = props => {

    const examplefunc = () => {
    }

    return (

        <div class="button-container">

            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.setfrienddataview(false); props.setviewcurrentfrienduserdata(false); }}>

                    <img src="/me.png" alt="Image 5" />
                </button>


                <div class="description-box">Your Activites</div>
            </div>

            <div class="button-wrapper">
                <button class="image-button" onClick={() => { if (props.viewcurrentfrienduserdata == true) { props.setviewcurrentfrienduserdata(false); props.setfrienddataview(true); } else { props.setviewcurrentfrienduserdata(false); props.setfrienddataview(true);   } }}>

                    <img src="home.png" alt="Image 5" />
                </button>
                <div class="description-box">Friend's Activites</div>
            </div>
            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.setfriends(true); }}>
                    <img src='/add-friend-icon.png' />

                </button>
                <div class="description-box">Add friends</div>
            </div>

            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.setviewfriends(true); }}>
                    <img src="/find-friends.png" alt="Image 2" />
                </button>
                <div class="description-box">View friends</div>
            </div>


            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.setviewfriendrequests(true); }}>
                    <img src="/friend-requests.png" alt="Image 4" />
                </button>
                <div class="description-box">Friend requests</div>
            </div>
        </div>


    )



}

export default Buttonmenu;