const Drawing = require('../models/drawing');
const Category = require('../models/category');

const apiCtrl = (function apiCtrl () {

    function categories (req, res) {
        Category
            .find()
            .sort({ position: 1 })
            .exec(function (err, categories) {
                if (err) { throw err; }
                res.json(categories)
            });
    }

    function category (req, res) {
        if (req.params.url === "undefined") {
            res.json([]);
            return;
        }
        Category
            .findOne({ url: req.params.url })
            .exec(function (err, category) {
                if (err) { throw err; }
                Drawing
                    .find({ category: category._id })
                    .exec(function (err, drawings) {
                        if (err) { throw err; }
                        res.json(drawings);
                    });
            });
    }

    const publicAPI = {
        categories,
        category
    };
    return publicAPI;
})();

module.exports = apiCtrl;
