var configProd = require('./webpack.config.prod');
var configDev = require('./webpack.config.dev');

module.exports = process.env.NODE_ENV === 'production' ?
    configProd : configDev;

console.log(process.env.NODE_ENV);
