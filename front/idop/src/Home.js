// import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, createContext,useEffect } from "react";
// import {  Routes, Route } from "react-router-dom";
import './css/login.css';
import './css/home.css';
import './css/friends.css';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAuth, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { app, logInWithEmailAndPassword, logOut, resetpw, addFriend, getuserinfoData, getFriends, confirmFriend, getUsers } from './Firebase'

import { useAuthState } from "react-firebase-hooks/auth";
import { getuserData, sendFilenoimage, deletedatabyid, deleteimagebyid, handlepreview, addfrienddb, getfriendsdata, getdatafromlistbyuid, handleImageError,updatepost } from "./useractions";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Newactivity } from './components/Newactivity.js';
import { ChangeTextButton } from './components/ChangeTextButton.js';
import { DetailedMenu } from './components/DetailedMenu.js';
import { ModifyActivityField } from './components/ModifyActivityField.js';
import { Activity } from './components/Activity.js';
import { Interaction } from './components/Interaction.js';
import { Buttonmenu } from './components/Buttonmenu.js';
import { ModifyButtonmenu } from './components/ModifyButtonmenu.js';
import { Detailed } from './components/Detailed.js';
import { Modify } from './components/Modify.js';
import { NavBar } from './components/NavBar.js';
import postactivity from "./postactivity";
import TextField from '@mui/material/TextField';
import { server } from "./server.js"
import ResponsiveAppBar from './components/Toolbar.js';
import { useThemeProps } from "@mui/material";
import { PageContext } from './PageContext.js';


const auth = getAuth();

function Home() {



  const [hamburger, sethamburger] = useState(false);
  // hooker to get user info - rename this
  const [usernm] = useAuthState(auth);

  // determines if page is still loadin
  const [loadingvar, setloadingvar] = useState(true);

  // test if auth information is still being recovered from  firebase
  const [authvar, setauthvar] = useState(true);
  // get the tokenid of the authenticated user using the GeTokenId method//
  const [tokenid, settokenid] = useState("");
  // save all the data from the  mongoDb from the user comes from getuserData method setuserdata hook is passed as an argument//
  const [userdata, setuserdata] = useState('nothing');
  const [currentfrienduserdata, setcurrentfrienduserdata] = useState("nothing");

  const [viewcurrentfrienduserdata, setviewcurrentfrienduserdata] = useState(false);
  // set the userid of the user needed for accessing things from firebase where userid is used to ID the user //
  // this user id is also the link between firebase and mongoDB //
  const [userid, setuserid] = useState('nothing');

  // hook to tell the page to load the newtask HTMl if it is clicked //
  const [newtask, setnewtask] = useState(false);
  // this is like the current activity for adding a new activity it is modified on change inside the NewActivity component
  const [activity, setactivity] = useState('nothing');
  // like activity abovec is used for storing detailed text
  const [detailtext, setdetailtext] = useState("nothing");
  // used when modify is hit so that the modify component knows what view to display //
  const [currentpost, setcurrentpost] = useState(false);
  const [userslist, setuserslist] = useState(" ");
  const [friendlist, setfriendlist] = useState(" ");

  //////////////////////////////// used to control page flow////////////////////

  // used to determine if the detailed view component should be displayed //

  // used to determine if the account view component should be displayed //
  const [account, setaccount] = useState(false);
  const [loggedout, setloggedout] = useState(false);
  const [reset, setreset] = useState(false);
  const [notprofile, setnotprofile] = useState(false);
  const [findfriends, setfriends] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [viewfriendrequests, setviewfriendrequests] = useState(false);
  const [friendrequestslist, setfriendrequestslist] = useState(false);

  const [AddFriendButtonText, setAddFriendButtonText] = useState("Add Friend");

  ///////////////////////////////////////////////////////////////////////////
  /* this stuff calls on state change to the firebase login info */
  // used to set the users friends from the firebase call
  const [userfriends, setuserfriends] = useState("");
  // text to display that changs have been saved
  const [savetext, setsavetext] = useState("");
  const [viewfriends, setviewfriends] = useState(false);
  const [friendsdata, setfriendsdata] = useState(["empty"]);
  const [frienddataview, setfrienddataview] = useState(false);

//for the detailed page//
  const [detailed, setdetailed] = useState(false);
  const [modify, setmodify] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const[interaction, setinteraction] = useState(false);


  const[context, setcontext] = useState({
    currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction
  });
  // react hook re-load data when key hooks are modified //
  useEffect(() => {

    auth.onAuthStateChanged(function (userlog) {
      if (userlog) {
        getIdToken(userlog).then((idToken) => {
          setuserid(userlog.uid);
          settokenid(idToken);
          sessionStorage.setItem("token", idToken);
          getuserData(setuserdata, userlog.uid, idToken, setloadingvar);
          getFriends(userlog.uid, setfriendlist, setfriendrequestslist);
          getUsers(setuserslist, setloadingvar, userlog.uid);
          getfriendsdata(setfriendsdata, userlog.uid, idToken);
        
        },
          (error) => {
            console.log("is no user log");
          });
      }
      else { }
      setauthvar(false);
    });


  }, [tokenid, modify, deleted, loadingvar, account, refresh,frienddataview, viewcurrentfrienduserdata,context])


  const contextValue = {
    currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction
  };
  
var navprops = {}

  // check if a username is returned if not directer user to login
  if (!usernm) {
    return (
      < div>         <p> Please login :  </p>
        <Link to="/"> Login </Link>
      </div>
    )
  }

  // if the new task flag is set then return the Newactivity component//
  if (interaction) {    
    return (  
<> 
      <PageContext.Provider value={contextValue}>
          <Interaction contextValue = {contextValue}> </Interaction>
  </PageContext.Provider>
</>
    ) 
  }


  // check if loading is true and display loading page used for retrieving data ect //
  if (loadingvar) {
    return (
      <p> Loading please wait  .... </p>
    )
  }

  // check if waiting on auth information and if so display auth loading page;'
  if (authvar) {
    return <p> is loading auth </p>;
  }




  // if the new task flag is set then return the Newactivity component//
  if (newtask) {

    
    return (  
<> 
      <PageContext.Provider value={contextValue}>
          <Newactivity
                onchange={e => setactivity(e.target.value)}
                onchangedetail={e => setdetailtext(e.target.value)}
                onclick={() => { postactivity(tokenid, userid, activity, detailtext, usernm.displayName).then(() => {  getuserData(setuserdata, userid, tokenid, setloadingvar, setnewtask);   setnewtask(!newtask);}) }}
                back={() => { setnewtask(false) }}
                textdetail={detailtext}
              > </Newactivity>
  </PageContext.Provider>
</>
    ) 
  }

  // if account button is clicked //
  if (account) {
    return (
      <div class="container">
        <div class="account-card">
          <h2>User Account</h2>

          <div class="form-group">
            <label for="username">Username:</label>
            <p name="email" id="email">  {usernm.displayName} </p>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <p name="email" id="email">  {usernm.email}  </p>
          </div>

          <div class="form-group">
            <button onClick={() => { resetpw(usernm.email); setreset(true); }}>Reset Password</button>
          </div>

          {reset ? (<p style={{ color: 'red' }} > Pasword reset ! </p>) : (<p> </p>)}

          <div class="form-group">
            <button onClick={() => { setaccount(false); setreset(false); }} >Back</button>
          </div>
        </div>
      </div>
    )
  }

  //if finding friends
  if (findfriends) {
    return (
      <section class="layout">
        <div class="header-top">
          <ResponsiveAppBar accounthandle={setaccount} />
          <Typography variant="h5" gutterBottom>
            Welcome {usernm.displayName} !
          </Typography>
        </div>
        <div class="header"></div>

        <div class="leftSide"> </div>
        <div class="body">
          <div class="new-activity-card">
            <input type="text" readOnly class="new-text-box" value="Find more friends ?" />
          </div>
          Adding friends !
          <button onClick={() => { setfriends(false); }} >Back</button>
          {userslist.map((x) => (
            <>
              {x.uid == userid ? <> </> :
                <div class="friends_card">
                  <img src="https://via.placeholder.com/50" alt="Profile Picture"></img>
                  <div>
                    <h3>{x.displayName}</h3>
                    <p>3 mutual friends fsdg</p>
                  </div>
                  <ChangeTextButton onClick={addFriend} userid={userid} uid={x.uid} setrefresh={setrefresh} 
                  refresh={refresh} friendName={x.displayName} userName={usernm.displayName} />

                </div>
              }
            </>
          ))}

          <div class="friends_card">

          </div>
        </div>
        <div class="rightSide">4</div>
        <div class="footer">5</div>
      </section>
    )
  }

  //view friends
  if (viewfriends) {
    return (
      <section class="layout">
        <div class="header-top">
          <ResponsiveAppBar accounthandle={setaccount} />
          <Typography variant="h5" gutterBottom>
            Welcome {usernm.friendName} !
          </Typography>
        </div>
        <div class="header"></div>

        <div class="leftSide"> </div>
        <div class="body">
          <div class="new-activity-card">
            <input type="text" readOnly class="new-text-box" value="Find more friends ?" />
          </div>

          Viewing friends !
          <button onClick={() => { setviewfriends(false); }} >Back</button>
          {friendlist.length > 0 ? friendlist.map((x) => (
            <>
              <div class="friends_card">
                <img src="https://via.placeholder.com/50" alt="Profile Picture"></img>
                <div>
                  <h3>{x.friendName}</h3>
                  <p>3 mutual friends sgsg</p>
                </div>
                {x.status ? <button class="small-button" onClick={() => { confirmFriend(userid, x.friend_id, x.friendName, false, addfrienddb); setrefresh(!refresh); }} > Remove friend ! </button>
                  : <button class="small-button" onClick={() => { confirmFriend(userid, x.friend_id, x.friendName, true, addfrienddb); setrefresh(!refresh); }} > Cancel request</button>
                }
              </div>
            </>
          )) : 0}
          <div class="friends_card">
          </div>
        </div>

      </section>

    )
  }

  //view friends requests
  if (viewfriendrequests) {
    return (
      <section class="layout">
        <div class="header-top">
          <ResponsiveAppBar accounthandle={setaccount} />
          <Typography variant="h5" gutterBottom>
            Welcome {usernm.friendName} ! Friend Requests.
          </Typography>
        </div>
        <div class="header"></div>

        <div class="leftSide"> </div>
        <div class="body">
          <div class="new-activity-card">
            <input type="text" readOnly class="new-text-box" value="Find more friends ?" />
          </div>

          Friend requests !
          <button onClick={() => { setviewfriendrequests(false); }} >Back</button>

          {friendrequestslist.length > 0 ? friendrequestslist.map((x) => (
            <>
              <div class="friends_card">
                <img src="https://via.placeholder.com/50" alt="Profile Picture"></img>
                <div>
                  <h3>{x.user + " " + usernm.friendName + " " + userid}</h3>
                  <p>3 mutual friends</p>
                </div>
                {x.status ? <button onClick={() => { confirmFriend(x.user, x.friend_id, x.userName, usernm.friendName, false, addfrienddb); setrefresh(!refresh); }} > Delete request ! </button>
                  : <button onClick={() => { confirmFriend(x.user, x.friend_id, x.userName, usernm.friendName, true, addfrienddb); setrefresh(!refresh); }} > Confirm friend</button>
                }
              </div>
            </>
          )) : 0}
          <div class="friends_card">

          </div>
        </div>
        <div class="rightSide">4</div>
        <div class="footer">5</div>
      </section>

    )
  }

  // if detailed button is clicked //
  if (detailed) {
     return (

      <PageContext.Provider value={contextValue}>
       <Interaction
       
       variant = {"detailed"}/> 
      </PageContext.Provider> 

   )
  }


  // if detailed button is clicked //
  if (modify) {
    return (

     <PageContext.Provider value={contextValue}>

<Interaction

       variant = {"modify"}/> 
 </PageContext.Provider> 

  )
 }



  return (

    <>

<PageContext.Provider value={contextValue}>
    <NavBar setnewtask={setnewtask}
    newtask={newtask}/>
 </PageContext.Provider> 




    
<section class="main">
    <div class="wrapper">
        <div class="left-col">

        {frienddataview ?
          friendsdata.map((post) => (
            <>
              <Activity
                label={"friends data "}
                post={post}
                setdetailed={setdetailed}
                setcurrentfrienduserdata={setcurrentfrienduserdata}
                setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
                setfrienddataview={setfrienddataview}
                getdatafromlistbyuid={getdatafromlistbyuid}
                friendsdata={friendsdata}
                userpage={false}
              > </Activity> </>
          ))
          :
          (viewcurrentfrienduserdata ? currentfrienduserdata.map((post) => (
            <Activity
              label={"current friends data "}
              post={post}
              setdetailed={setdetailed}
              setcurrentpost={setcurrentpost}
              setcurrentfrienduserdata={setcurrentfrienduserdata}
              setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
              setfrienddataview={setfrienddataview}
              getdatafromlistbyuid={getdatafromlistbyuid}
              friendsdata={friendsdata}
              userpage={false}
            > </Activity>
          )) : userdata.map((post) => (
            <Activity
              label={" "}
              post={post}
              setdetailed={setdetailed}
              setcurrentpost={setcurrentpost}
              setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
              setfrienddataview={setfrienddataview}
              getdatafromlistbyuid={getdatafromlistbyuid}
              friendsdata={friendsdata}
              userpage={true}
            > </Activity>
          ))
          )
        }
          
            </div>
        </div>

</section>
  
    </>
  );
}

export default Home ;
