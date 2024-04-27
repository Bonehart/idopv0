// login API//
var express = require("express");
var activity = require("../schemas/activity");
var router = express.Router();
const app = express();
var mongoose = require('mongoose');
var shortid = require('shortid');
var friend = require("../schemas/friends");
const req = require("express/lib/request");
var user = require("../checkauth");

const {getAuth, auth } = require('firebase-admin/auth');

var user = require("../checkauth");
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = require("../db/connect.js"); 
var mongoose = require('mongoose');
 
app.use(express.urlencoded({
     extended: true
}))

async function submitfriend(data, model) {
    await model.create(data);
    const docs = await model.find();
    console.log(docs[0].username);
};

router.post("/addfriend", checkIfAuthenticated, function(req, res, next) {
    console.log("Adding new friend...back end..");

      const uid = req.body.uid;
      const friend_uid =  req.body.friend_uid;
      const friendName =  req.body.friendName;
      const userName =  req.body.userName;

       var newfriend = {"uid": uid,  "friend_uid": friend_uid,  "friendName" : userName, "userName": friendName};
       submitfriend(newfriend,friend);

       var newfriend1 = {"uid": friend_uid,  "friend_uid": uid , "friendName" : friendName, "userName": userName};
       submitfriend(newfriend1,friend);
    res.end();
    });

    module.exports = router;