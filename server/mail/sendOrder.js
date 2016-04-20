'use strict';

const path = require('path');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate

// load auth data
require('dotenv').load();

const templateDir = path.join(__dirname, 'templates', 'order-email');

const order = new EmailTemplate(templateDir);
const user = {name: 'Joey'};
order.render(user, function (err, result) {
    console.log(result.html);
})

// config
const smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_ADDRESS, // edit in .env file
        pass: process.env.MAIL_PASSWORD
    }
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(smtpConfig);

// create template based sender function
const sendOrderTemplate = transporter.templateSender({
    subject: 'Пользователь!',
    text: "Hello, only text",
    html: `
        <h1>Hello!</h1>
        <p>{{user}}</p>
        <p>{{cart}}</p>
    `
}, {
    to: 'e.i.eremeev@gmail.com',
    from: `"Заказ" <${process.env.MAIL_ADDRESS}>`,
});


// use template based sender to send a message
function sendOrder(user, cart) {
    return sendOrderTemplate({}, {
        user: JSON.stringify(user),
        cart: JSON.stringify(cart)
    });
}

module.exports = sendOrder;
