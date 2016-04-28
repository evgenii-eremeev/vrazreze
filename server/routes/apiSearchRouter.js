"use strict";

const Drawing = require('../models/drawing');

module.exports = function _apiSearchRouter(app) {

    // search
    app.get('/api/search', function _apiSearch(req, res) {
        const query = req.query.q || "";
        console.log(query);
        Drawing
            .find(
                { $text: { $search: query } },
                { score: { $meta: "textScore" } }
            )
            .sort({ score: { $meta : 'textScore' } })
            .exec(function(err, results) {
                if (err) { throw err; }
                res.send(results);
            });
    });

};
