var Drawing = require('../models/drawing');

var newDrawing = {

    post(req, res) {
        var drawing = new Drawing({
            title: req.body.title,
            author: req.user.username,
            description: req.body.description,
            category: req.body.category,
            drawing_composition: req.body.drawing_composition.split(','),
            tags: req.body.tags.split(','),
            price: req.body.price,
            picture: req.file ? req.file.filename : ''
        });
        drawing.save(function (err, drawing) {
            if (err) { throw err; }
            res.json(drawing);
        });
    }
};

module.exports = newDrawing;
