const fs = require('fs');

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
        Category
            .findOne({ url: req.params.url })
            .exec(function (err, category) {
                if (err) { throw err; }
                if (!category) {
                    return res.sendStatus(404);
                }
                Drawing
                    .find({ category: category._id })
                    .exec(function (err, drawings) {
                        if (err) { throw err; }
                        res.json(drawings);
                    });
            });
    }

    function deleteDrawing(req, res) {
        Drawing.findByIdAndRemove(
            req.params.drawingId,
            function(err, drawing) {
                if (err) { throw err; }
                const picPath = process.cwd() + '/public/pics/' + drawing.picture;
                fs.unlink(picPath, function (err) {
                    if (err) {
                        console.error("Error unlinking file", err);
                        return res.status(206).end();
                    }
                    res.status(200).end();
                });
            }
        );
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
        Category.findByIdAndUpdate(
            req.params.categoryId,
            // same as { $set: {...}}
            {
                name: req.body.formData.name,
                url: req.body.formData.url,
                position: req.body.formData.position
            },
            function(error, category) {
                if (error) { throw error; }
                res.status(200).end();
            }
        );
    }

    const publicAPI = {
        categories, category, addCategory,
        deleteCategory, updateCategory,
        deleteDrawing
    };
    return publicAPI;
})();

module.exports = apiCtrl;
