const Drawing = require('../models/drawing');
const Category = require('../models/category');

const newDrawing = (function newDrawing (){

    function post(req, res) {
        Category
            .findOne({ name: req.body.category })
            .exec(function (err, category) {
                if (err) { throw err; }
                const drawing = new Drawing({
                    title: req.body.title,
                    author: req.user.username,
                    description: req.body.description,
                    category: category._id,
                    drawing_composition: req.body.drawing_composition ?
                        req.body.drawing_composition.split(',') : [],
                    tags: req.body.tags ?
                        req.body.tags.split(',') : [],
                    price: req.body.price,
                    picture: req.file ? req.file.filename : ''
                });
                drawing.save(function (err, drawing) {
                    if (err) { throw err; }
                    res.json(drawing);
                });
        });
    }

    const publicAPI = { post };
    return publicAPI;
})();

module.exports = newDrawing;
