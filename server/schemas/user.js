var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({ username: String, password: String, plot: String

, activites: []});

module.exports = mongoose.model('Customer', UserSchema, 'idopusers');
