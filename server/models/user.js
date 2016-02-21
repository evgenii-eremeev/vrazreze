'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: { type: String, maxlength: 255, required: true, unique: true },
    register_date: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    role: { type: String, maxlength: 255, default: 'user' },
    rating: { type: Number, default: 0 },
    education: { type: String, maxlength: 255 },
    software: { type: String, maxlength: 255 },
    speciality: { type: String, maxlength: 255 },
    about: { type: String, maxlength: 1500 },
    site: { type: String, maxlength: 255 },
    social: {type: String, maxlength: 255 }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;
