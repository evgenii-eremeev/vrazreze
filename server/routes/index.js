"use strict";

module.exports = function(app) {

    require('./apiRouter')(app);
    require('./apiSearchRouter')(app);
    require('./authRouter')(app);
    require('./emailRouter')(app);

};
