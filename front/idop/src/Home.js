// import logo from './logo.svg';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import {  Routes, Route } from "react-router-dom";
import './css/login.css';
import './css/home.css';
import './css/friends.css';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAuth, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { app, logInWithEmailAndPassword, logOut, resetpw, addFriend, getuserinfoData, getFriends, confirmFriend, getUsers } from './Firebase'

import { useAuthState } from "react-firebase-hooks/auth";
import { getuserData, sendFilenoimage, deletedatabyid, deleteimagebyid, handlepreview, addfrienddb, getfriendsdata, getdatafromlistbyuid, handleImageError } from "./useractions";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Newactivity } from './components/Newactivity.js';
import { ChangeTextButton } from './components/ChangeTextButton.js';
import { Activity } from './components/Activity.js';
import { Buttonmenu } from './components/Buttonmenu.js';
import { ModifyButtonmenu } from './components/ModifyButtonmenu.js';
import postactivity from "./postactivity";
import TextField from '@mui/material/TextField';

import ResponsiveAppBar from './components/Toolbar.js';

const auth = getAuth();

function Home() {

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
  const [modify, setmodify] = useState(false);
  // used to determine if the detailed view component should be displayed //
  const [detailed, setdetailed] = useState(false);
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
  // used to set the users friends from the firebase call
  const [userfriends, setuserfriends] = useState("");
  // text to display that changs have been saved
  const [savetext, setsavetext] = useState("");
  const [deleted, setdeleted] = useState(false);
  const [viewfriends, setviewfriends] = useState(false);
  const [friendsdata, setfriendsdata] = useState(["empty"]);
  const [frienddataview, setfrienddataview] = useState(true);

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


  }, [tokenid, modify, deleted, loadingvar, account, refresh, frienddataview, viewcurrentfrienduserdata])

  // check if a username is returned if not directer user to login
  if (!usernm) {
    return (
      < div>         <p> Please login :  </p>
        <Link to="/Login"> Login </Link>
      </div>
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
    return <Newactivity
      onchange={e => setactivity(e.target.value)}
      onchangedetail={e => setdetailtext(e.target.value)}
      onclick={() => { postactivity(tokenid, userid, activity, detailtext, usernm.displayName).then(() => { getuserData(setuserdata, userid, tokenid, setloadingvar, setnewtask); }) }}

      
      back={() => { setnewtask(false) }}
      textdetail={detailtext}
    > </Newactivity>
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
                  <ChangeTextButton onClick={addFriend} userid={userid} uid={x.uid} setrefresh={setrefresh} refresh={refresh} friendName={x.displayName} userName={usernm.displayName} />

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
                {x.status ? <button  class="small-button" onClick={() => { confirmFriend(userid, x.friend_id, x.friendName, false, addfrienddb); setrefresh(!refresh); }} > Remove friend ! </button>
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
      <div class="body">
        <div class='new-post-det'>
          {
            // if modify is clicked //
            modify ? (
              <section>        <h2 class="card-heading"> Activity title</h2>

                <TextField style={{ width: '100%', marginBottom: 5, htmlFontSize: 10 }}
                  id="activity"
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={5}
                  placeholder="Enter details about activity"
                  defaultValue={currentpost.activity} /> </section>
            )
              : (
                <div>
                  <h2 class="card-heading"> {currentpost.activity}</h2>
          
                </div>
              )
          }
          {
            modify ? (
              <TextField style={{ width: '100%' }}
                id="activitydetail"
                variant="outlined"
                multiline
                minRows={20}
                maxRows={2000}
                placeholder="Enter details about activity"
                defaultValue={currentpost.detail}
              />
            )
              : (
                <h6 class="card-second-heading">
                  {currentpost.detail}
                </h6>)
          }
         

          {modify ? (
            <img src="" id="preview" alt=" "></img>
          ) :
            (
              <img src={"/Images/" + currentpost.image + ".png"} alt=" "></img>
            )
          }
      

          {modify ? (
            <Button variant="contained" onClick={() => {
              sendFilenoimage(
                document.getElementById('activity').value,
                document.getElementById('activitydetail').value, currentpost._id);
              setsavetext("changed saved");
            }} >Save changes

            </Button>
          )
            :
            (
              " "
            )}

          {modify ? (
            <> 
            <Button variant="contained" type="submit" onClick={() => (document.getElementById('image').click())} >
              <input hidden type="file" onChange={handlepreview} name="image" id="image" />Modify Image
            </Button>
            
            <Button variant="contained" onClick={() => { setdetailed(false); setmodify(false); }} >
            Back
          </Button>

          </>
            
            )
            :
            (
              frienddataview || viewcurrentfrienduserdata ?
                <Button variant="contained" onClick={() => { setdetailed(false); setmodify(false); }} >
                  Back
                </Button>
                :
                <>
                  <Button variant="contained" onClick={() => { setmodify(true); }} >
                    Modify
                  </Button>
                  <Button variant="contained" onClick={() => { deletedatabyid(currentpost._id, setdeleted); }} >
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => { deleteimagebyid(currentpost._id, setdeleted(true)); }} >
                    Delete Image
                  </Button>
                  <Button variant="contained" onClick={() => { setdetailed(false); setmodify(false); }} >
                    Back
                  </Button>


           
                </>
            )
          }

        </div>
      </div>
    )
  }
  return (
    <>

      <div class="header-top">
        <ResponsiveAppBar accounthandle={setaccount} />
        <Typography variant="h5" gutterBottom>
          Welcome hdhd {usernm.displayName} !
        </Typography>
      </div>

      <div class="body">
  
        <div class="new-activity-card">
          <input type="text" readOnly class="new-text-box" value="Enter new activity ?" onClick={() => setnewtask(true)} />
        </div>


        <Buttonmenu
            setfrienddataview={setfrienddataview}
            setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
            viewcurrentfrienduserdata={viewcurrentfrienduserdata}
     
            setfriends={setfriends}
            setviewfriends={setviewfriends}
            setviewfriendrequests={setviewfriendrequests}
          >
          </Buttonmenu>

        <div class="content-buffer">        {viewcurrentfrienduserdata ?  <h1 class="card-heading-user"> "Only Profile of " {friendsdata[0].displayName} </h1> : <> </>}
        {!viewcurrentfrienduserdata & !frienddataview ?  <h1 class="card-heading-user"> "Profile of " {usernm.displayName} </h1> : <> </>}
        {/* {frienddataview ?  <h1 class="card-heading-user"> "Friends of " {usernm.displayName}  - showing friends of Testuser001 for Demo purposes but would otherwise show friends of current user only</h1> : <> </>}  */}
        
        </div>

        {frienddataview ?

          friendsdata.map((post) => (

            <>

sgsgsgsg 
            <Activity
            
              label={"friends data "}
              post={post}
              setdetailed={setdetailed}
              setcurrentfrienduserdata={setcurrentfrienduserdata}
              setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
              setfrienddataview={setfrienddataview}
              getdatafromlistbyuid={getdatafromlistbyuid}
              friendsdata={friendsdata}

            > </Activity> </>
          ))
          :
          (viewcurrentfrienduserdata ? currentfrienduserdata.map((post) => (

            <>
aaaaaaaaa
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
            > </Activity> </>
          )) : userdata.map((post) => (

            <>
              <Activity
                label={"profile data "}
                post={post}
                setdetailed={setdetailed}
                setcurrentpost={setcurrentpost}

                setviewcurrentfrienduserdata={setviewcurrentfrienduserdata}
                setfrienddataview={setfrienddataview}
                getdatafromlistbyuid={getdatafromlistbyuid}
                friendsdata={friendsdata}
                userpage={true}
              > </Activity>

            </>
          ))

          )

        }
      </div>


    </>
  );
}

export default Home;
