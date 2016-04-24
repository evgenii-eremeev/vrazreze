"use strict";

const sendOrder = require('../email/sendOrder');

module.exports = function _moduleExports(app) {

    // send order with single drawing
    app.post('/mail/order', function (req, res) {
        const user = {
            email: req.body.email,
            displayName: req.body.displayName
        };
        sendOrder(user, req.body.cart)
            .then(info => {
                console.log('Order is sent');
                res.status(200).end("Запрос отправлен");
            })
            .catch(error => {
                console.log('Error on sending order:', error);
                res.end('Что-то пошло не так, попробуйте снова');
            })
    });

};
