'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var drawingSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: { type: String, maxlength: 255, required: true },
    author: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1500, required: true },
    category: { type: Schema.Types.ObjectId, required: true },
    drawing_composition: [String],
    price: { type: Number, default: 0},
    tags: [String],
    picture: String,
    views: { type: Number, default: 0 }
});

var Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
