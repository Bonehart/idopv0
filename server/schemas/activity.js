var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({ username: String, 
     activity: String, 
     detail: String,
     _id: String, 
     image: String, 
     displayName: String,
     
    
    
    
    dateAdded:  { type: Date, default: Date.now }



});

module.exports = mongoose.model('Activity', ActivitySchema, 'activity');