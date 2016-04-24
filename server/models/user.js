'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: { type: String, maxlength: 140, required: true, unique: true },
    displayName: { type: String, maxlength: 140 },
    registerDate: { type: Date, default: Date.now },
    role: { type: String, maxlength: 140, default: 'user' },
    about: { type: String, maxlength: 2000 }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;
