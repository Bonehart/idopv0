var mongoose = require('mongoose');

var FriendsSchema = new mongoose.Schema({ 
    
    uid: String, 
  

     friend_uid: String, 
    friendName: String,
    userName: String,
    dateAdded:  { type: Date, default: Date.now }



});

module.exports = mongoose.model('Friends', FriendsSchema, 'friends');