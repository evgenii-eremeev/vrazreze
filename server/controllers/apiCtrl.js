const Drawing = require('../models/drawing');

const apiCtrl = {

    drawings (req, res) {
        Drawing.find({}, function (err, drawings) {
            if (err) {
                throw err;
            }
            res.json(drawings);
        });
    }

};

module.exports = apiCtrl;
