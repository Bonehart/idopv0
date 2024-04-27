// login API//
var express = require("express");
var activity = require("../schemas/activity");
var friend = require("../schemas/friends");
var router = express.Router();
const app = express();
var mongoose = require('mongoose');
var shortid = require('shortid');
const req = require("express/lib/request");
var user = require("../checkauth");
const {getAuth, auth } = require('firebase-admin/auth');

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

/**** functions to assit routes ****/
async function getactivity(model, user) {
     return model.find({"username" : user}).sort({ dateAdded: 'descending' }).then(function (act) { return act });
};

async function getactivitybyid(model, id) {
     return model.find({"_id" : id}).then(function (act) { return act });
};

async function getrandact(model, connection) {
     var random = Math.floor(Math.random() * 1);
     return model.find().skip(random).limit(5).then(function (act) { return act });
};



/****  route to get list of activities based on username ****/
router.get("/", checkIfAuthenticated, function (req, res, next) {

     const user = req.query.username;
     getactivity(activity, user).then(function (x) {
          res.send(x);
     }   
  );
});



/**** route to get distinct list of users ****/
router.get("/getrandusers",checkIfAuthenticated, async function (req, res, next) {

    try {
        const distinctValues = await activity.distinct('username');
        res.json(distinctValues);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
});

async function getfriends(model, uid) {
    // return model.find({"uid" : uid}).sort({ dateAdded: 'descending' }).then(function (frnd) { return frnd });
};

router.get("/getfriendsdata",checkIfAuthenticated, async function (req, res,next) {

    friendslist = await friend.find({"uid" : req.query.username}).distinct("friend_uid");

    filter_condition = {username: {'$in': friendslist}}
    filtered_documents = await activity.find(filter_condition);

    res.send(filtered_documents);
    res.end();
}
);


/**** route to get a single activity based on the id of that activity ****/
/**** used in things like when you click on an activity to show more detailed info i.e it queries the db or list for that queries detailed info*****/
router.get("/getbyid", checkIfAuthenticated,function (req, res, next) {
    const id = req.query.id;
    activity.findById(id, function(err, result){
         if(err){
             res.send(err)
         }
         else{
             res.send(result)
         }
     })
});

router.get("/deletebyid",checkIfAuthenticated, function (req, res, next) {
     const id = req.query.id;
     activity.deleteOne({_id: id}, function(err, result){
          if(err){
              res.send(err)
          }
          else{
              res.send(result)
          }
      })
});

/**** updated by id used for modifying records allows modification of text only  ****/
/**** modifies the titles of the activity and the detail****/
router.get("/deleteimagebyid",checkIfAuthenticated, function (req, res,next) {
     var id_ = req.query.id;
      activity.findByIdAndUpdate(id_,{"image": "NOIMAGE"}, function(err, result){
           if(err){
               res.send(err)
           }
           else{
               console.log("done");
           }
       })
});

/**** updated by id used for modifying records allows modification of text only  ****/
/**** modifies the titles of the activity and the detail****/
router.post("/updatebyid", checkIfAuthenticated,function (req, res,next) {


    try{
console.log("running update by id");

        var id_ = req.body.id;
     
        var  activitydata = req.body.activity;
        var detail = req.body.detail;
   
       activity.findByIdAndUpdate(id_,{"activity": activitydata, "detail": detail}, function(err, result){
              if(err){
                  res.send(err)
              }
              else{
                  res.send("activity modified")
              }
          })
   



    }
    catch (e)
    {

        console.log("erroir is " + e);
    }


});

router.post("/updatebyidimg", checkIfAuthenticated,function (req, res,next) {
    var id_ = req.body.id;
    var  activitydata = req.body.activity;
    var detail = req.body.detail;
    var image = req.body.image;

   activity.findByIdAndUpdate(id_,{"activity": activitydata, "detail": detail, "image": image}, function(err, result){
          if(err){
              res.send(err)
          }
          else{
              res.send("activity modified")
          }
      })
      console.log(image);
});

/**** updated image by id used for modifying records allows modification of text only  ****/
/**** modifies the text file name of image****/
router.post("/updateimagebyid", checkIfAuthenticated,function (req, res,next) {
    var id_ = req.body.username;

    var  image = req.body.image;

     activity.findByIdAndUpdate(id_,{"image": image}, function(err, result){
          if(err){
              res.send(err)
          }
          else{
              res.send("image updated")
          }
      })
});

/**** updated by id used for modifying records allows modification of text only  ****/
/**** modifies the titles of the activity and the detail****/
router.post("/deletebyid", checkIfAuthenticated,function (req, res,next) {
     var id_ = req.body.id;
      activity.deleteOne({"id_": String(id_)}, function(err, result){
           if(err){
               res.send(err)
           }
           else{
               res.send("id deleted from database")
           }
       })
});


router.get("/gethomeact", checkIfAuthenticated,function (req, res, next) {
     getrandact(activity).then(function (x) {
   
          res.send(x);
     }
     );
});

module.exports = router;
 