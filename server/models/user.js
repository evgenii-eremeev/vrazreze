'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: { type: String, maxlength: 255, required: true, unique: true },
    register_date: { type: Date, default: Date.now },
    role: { type: String, maxlength: 255, default: 'user' },
    about: { type: String, maxlength: 1500 }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;
