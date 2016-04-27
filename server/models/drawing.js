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
}, {
    autoIndex: false
});

drawingSchema.index({
    title: 'text',
    description: 'text',
    tags: 'text',
    drawing_composition: 'text'
}, {
    name: 'textIndex',
    default_language: 'russian',
    weights: {
        title: 10,
        description: 5,
        tags: 7,
        drawing_composition: 1
    }
});

var Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
