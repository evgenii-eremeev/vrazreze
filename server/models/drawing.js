'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var drawingSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: { type: String, maxlength: 255, required: true },
    author: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1500, required: true },
    category: { type: String, maxlength: 255, required: true },
    drawing_composition: [String],
    software: String,
    rating: { type: Number, default: 0 },
    tags: [String],
    picture: String,
    archive_link: String,
    site: String,
    views: { type: Number, default: 0 },
    other: Schema.Types.Mixed
});

var Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
