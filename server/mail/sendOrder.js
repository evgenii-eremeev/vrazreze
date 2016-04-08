var nodemailer = require('nodemailer');

// load auth data
require('dotenv').load();

// config
var smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_ADDRESS, // edit in .env file
        pass: process.env.MAIL_PASSWORD
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// create template based sender function
var sendOrderTemplate = transporter.templateSender({
    subject: 'Пользователь {{username}}!',
    text: `     Заказ\n
        {{title}}\n
        {{description}}\n
        Цена: {{price}} рублей\n
        Ответить человеку:
        {{email}}
    `,
    html: `
        <h1 style="text-align: center">Заказ</h1>
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <p>Цена: <strong>{{price}} рублей</strong></p>
        <p>Ответить человеку: {{email}}</p>
    `
}, {
    to: 'jaycrypto@gmail.com',
    from: `"Заказ" <${process.env.MAIL_ADDRESS}>`,
});


// use template based sender to send a message
function sendOrder(user, drawing) {
    return sendOrderTemplate({}, {
        username: user.name || 'Anonymous',
        email: user.username,
        title: drawing.title,
        description: drawing.description,
        price: drawing.price || ""
    });
}

module.exports = sendOrder;
