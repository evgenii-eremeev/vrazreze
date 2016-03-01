var Drawing = require('../models/drawing');

var newDrawing = {
    
    get(req, res) {
        res.render('newDrawing');  
    },
    
    post(req, res) {
        var drawing = new Drawing({
            title: req.body.title,
            author: req.user ? req.user.username : 'anonymous',
            description: req.body.description,
            category: req.body.category,
            drawing_composition: req.body.drawing_composition.split(','),
            tags: req.body.tags.split(','),
            picture: req.file ? req.file.path : ''
        });
        drawing.save(function (err, drawing) {
            if (err) { throw err; }
            res.redirect('/');
        });
    }
};

module.exports = newDrawing;