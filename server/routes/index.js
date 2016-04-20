"use strict";

module.exports = function(app) {

    require('./apiRouter')(app);
    require('./authRouter')(app);
    require('./mailRouter')(app);
    
};
