var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var docs;

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {getAuth, auth } = require('firebase-admin/auth');
const { collection, getDocs } = require('firebase/firestore');
const serviceAccount = require('../keys.json');


const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    authToken = req.headers.authorization.split(' ')[1];
  } else {


    console.log("is null" );

  }
  next();
};


module.exports=  checkIfAuthenticated = (req, res, next) => {

  getAuthToken(req, res, async () => {
       try {
       await getAuth()
        .verifyIdToken(authToken )
        .then((decodedToken) => {
         console.log("is accessing");
                return next() 
        })
       } 
       catch (e) 
       {
         return res
           .status(401).send({ error: 'You are not authorized to make this request ' });
          //  .send({ e });
           
       }
  
     });
 
   };
 
