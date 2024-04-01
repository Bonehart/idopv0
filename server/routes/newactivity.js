var user = require("../checkauth");
var express = require("express");
var activity = require("../schemas/activity");
var friend = require("../schemas/friends");
var router = express.Router();
const app = express();
var mongoose = require('mongoose');
var shortid = require('shortid');

var db = require("../db/connect.js"); 
var mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: true
  }))

async function submitactivity(data, model,image) {
     await model.create(data);
     const docs = await model.find();
     console.log(docs[0].username);
};

router.post("/", checkIfAuthenticated, function(req, res, next) {
     const username = req.body.username;
     const activitytext = req.body.activity;
     const image =  req.body.image;
     const detail = req.body.detail;
     const displayName = req.body.displayName;

     var newactivity = {"username": username, "activity": activitytext, "detail": detail,
       _id: shortid.generate(),"image": image, displayName: displayName, dateAdded: Date.now()};
          console.log(newactivity);
    submitactivity(newactivity,activity,image);
    res.send("wrote fine");

    res.end();
     });

module.exports = router;
