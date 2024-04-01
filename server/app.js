var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
bodyParser = require('body-parser');
var usersRouter = require('./routes/users');

var addimageRouter = require("./routes/addimage");
var newactivityRouter = require("./routes/newactivity");
var getactivitiesRouter = require("./routes/getactivities");
var addfriendRouter = require("./routes/addfriend");


var firebase = require("./authconfig.js");

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { collection, getDocs } = require('firebase/firestore');

var app = express();


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
;

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

app.use('/users', usersRouter);

app.use("/addimage", addimageRouter);
app.use("/newactivity", newactivityRouter);

app.use("/getactivities", getactivitiesRouter);

app.use('/addfriend', addfriendRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
