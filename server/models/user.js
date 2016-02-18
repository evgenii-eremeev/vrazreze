'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, maxlength: 255, required: true },
    pwd_hash: { type: String, required },
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
    other: Schema.Types.Mixed
});

var User = mongoose.model('User', drawingSchema);

module.exports = User;
