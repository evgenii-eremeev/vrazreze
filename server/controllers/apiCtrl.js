const Drawing = require('../models/drawing');
const Category = require('../models/category');

const apiCtrl = (function apiCtrl () {

    function drawings (req, res) {
        Drawing.find({}, function (err, drawings) {
            if (err) {
                throw err;
            }
            res.json(drawings);
        });
    }

    function categories (req, res) {
        Category.
            find().
            sort({ position: 1 }).
            exec(function (err, categories) {
                if (err) {
                    throw err;
                }
                res.json(categories)
            });
    }

    const publicAPI = {
        drawings, 
        categories
    };
    return publicAPI;
})();

module.exports = apiCtrl;
