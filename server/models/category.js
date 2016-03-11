'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type: String, maxlength: 140, required: true, unique: true },
    url: { type: String, maxlength: 140, required: true, unique: true },
    position: { type: Number, default: 0 }
});

var Category = mongoose.model('Category', categorySchema);

// insert default categories
Category.findOne({}, function (err, category) {
    if (err) {
        throw err;
    }
    if (!category) {
        var cats = [
            {
                name: "Машиностроение",
                url: "mashinostroenie",
                position: 0,
            },
            {
                name: "Сельское хозяйство",
                url: "sel_hoz",
                position: 1,
            },
            {
                name: "Промышленность",
                url: "prom",
                position: 2,
            },
            {
                name: "Строительсво",
                url: "stroitelstvo",
                position: 3,
            },
            {
                name: "Схемы",
                url: "shemi",
                position: 4,
            },
            {
                name: "Транспорт",
                url: "transport",
                position: 5,
            },
            {
                name: "Станки",
                url: "stanki",
                position: 6,
            },
            {
                name: "Прочее",
                url: "prochee",
                position: 7,
            }
        ]

        Category.insertMany(cats, function(err, docs) {
            if (err) {
                throw err;
            }
            console.log("Default categories added...")
        });
    }
});

module.exports = Category;
