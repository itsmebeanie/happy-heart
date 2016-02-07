var mongoose = require('mongoose');

var User = new mongoose.Schema({
	username: String,
    email: String,
    password: String
});



mongoose.connect('mongodb://happyheart:brown2016@ds058548.mongolab.com:58548/happyheart');
