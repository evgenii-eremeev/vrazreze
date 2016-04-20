"use strict";

const sendOrder = require('../mail/sendOrder');

module.exports = function _moduleExports(app) {
    
    // send order with single drawing
    app.post('/mail/order', function (req, res) {
        if (!req.body.user) {
            return res.status(400).end("User not specified");
        }

        sendOrder(req.body.user, req.body.cart)
            .then(info => {
                console.log('Order is sent');
                console.log('sendOrder', info)
                res.status(200).end("Запрос отправлен");
            })
            .catch(error => {
                console.log('Error on sending order:', error);
                res.end('Что-то пошло не так, попробуйте снова');
            })
    });

};