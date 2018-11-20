var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema model for a user
var user = new Schema({
    googleId: String,
    name: String
});

//model class
mongoose.model('users', user);