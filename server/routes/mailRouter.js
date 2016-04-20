"use strict";

const sendOrder = require('../mail/sendOrder');

module.exports = function _moduleExports(app) {
    
    // send order with single drawing
    app.post('/mail/order', function (req, res) {
        const formData = req.body.formData;
        if (!formData.user) {
            return res.status(400).end("User not specified");
        }

        sendOrder(formData.user, formData.drawing)
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