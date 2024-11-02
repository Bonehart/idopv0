
import React, {useContext}  from 'react';
import ReactDOM from 'react-dom';
import { PageContext } from '../PageContext.js';

export const NavBar = props => {


 
    


    return (
        <nav class="navbar">
        <div class="nav-wrapper">
            <img src="idop.png" class="brand-img" alt="" />
            <div class="nav-items">
                <img src="add.PNG" class="icon" alt="" onClick={() => { props.setnewtask(!props.newtask);  }} />
                <img src="home.PNG" class="icon" alt=""/>
                <img src="user.png" class="icon" alt="" onClick={() => { props.setaccount(!props.account);  }} />
                <img src="add-friend-icon.png" class="icon" alt=""/>
                <img src="friend-requests.png" class="icon" alt=""/>
                <img src="find-friends.png" class="icon" alt=""/>
            </div>
        </div>
      </nav>
    )
}

export default NavBar;