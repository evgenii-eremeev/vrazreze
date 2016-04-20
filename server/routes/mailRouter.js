// sendOrder

const express = require('express');
const router = express.Router();

const sendOrder = require('../mail/sendOrder');

router.post('/mail/order', function (req, res) {
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

module.exports = router;