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

    function addCategory(req, res) {
        const category = new Category({
            name: req.body.formData.name,
            url: req.body.formData.url,
            position: req.body.formData.position
        });
        category.save(function(err, category) {

            res.json(category);
        });
    }

    function deleteCategory(req, res) {
        Category.findByIdAndRemove(
            req.params.categoryId,
            function(err, category) {
                if (err) { throw err; }
                res.status(200).end();
            }
        );
    }

    function updateCategory(req, res) {
        Categories.findByIdAndUpdate(
            req.params.categoryId,
            // same as { $set: {...}}
            {
                name: req.body.formData.name,
                url: req.body.formData.url,
                position: req.body.formData.position
            },
            function(err, category) {
                if (error) { throw error; }
                res.status(200).end();
            }
        );
    }

    const publicAPI = {
        categories,
        category,
        addCategory,
        deleteCategory,
        updateCategory
    };
    return publicAPI;
})();

module.exports = apiCtrl;
