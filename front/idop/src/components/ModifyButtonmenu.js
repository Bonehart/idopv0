
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import { handleImageError } from "../useractions";



export const ModifyButtonmenu = props => {
    const examplefunc = () => {
    }
    return (
        <div class="button-container-modify">

            <div class="button-wrapper">
                <button class="image-button-modify" onClick={() => { props.onclickmodify(true);}}>
                    <img src="/me.png" alt="Image 5" />
                </button>
                <div class="description-box">Modify </div>
            </div>

            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.onclickmodify(true);}}>
                    <img src="/me.png" alt="Image 5" />
                </button>
                <div class="description-box">Modify </div>
            </div>
            <div class="button-wrapper">
                <button class="image-button" onClick={() => {   props.onclickdelete(props.currentpost._id, props.setdeleted); }}>
                    <img src="home.png" alt="Image 5" />
                </button>
                <div class="description-box">Delete</div>
            </div>
            <div class="button-wrapper">
                <button class="image-button" onClick={() => { props.onclickdeleteimage(props.currentpost._id,props.setdeleted(true) )}}>
                    <img src='/add-friend-icon.png' />
                </button>
                <div class="description-box">Delete Image</div>
            </div>
        </div>
    )
}

export default ModifyButtonmenu;