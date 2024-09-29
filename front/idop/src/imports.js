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

