var express = require("express");
var activity = require("../schemas/activity");
var router = express.Router();
const app = express();
var mongoose = require('mongoose');
var shortid = require('shortid');
const multer = require('multer');

const path = require('path');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
var user = require("../checkauth");
app.use(express.urlencoded({
    extended: true
  }))


 app.use(express.static("/home/ncrowle/GIT/idop0/idopv0/front/idop/public/Images"));

 app.use(fileUpload());
  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, '/home/ncrowle/GIT/idop0/idopv0/front/idop/public/Images')
      },
      filename: (req, file, cb) => { 
        cb(null,req.body.key  + path.extname(file.originalname))    
        //    cb(null,file.originalname)   
  
      }
  })

 const upload = multer({ storage: storage })


router.post('/', upload.single('image'), (req, res) => {

            res.send("file sent");
})


router.get('/', (req, res, next) => {
    res.send(file)
})

module.exports = router;