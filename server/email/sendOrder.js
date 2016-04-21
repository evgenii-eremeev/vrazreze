'use strict';

const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate
const transporter = require('./transporter');

// create orderEmail template
const templateDir = path.join(__dirname, 'templates', 'orderEmail');
const orderEmail = new EmailTemplate(templateDir);

function sendOrder(user, cart) {
    // locals is the container for variables that could be used in template
    // you could not use locals.user.name in template, just user.name
    const locals = {
        user: user,
        cart: cart
    };
    
    // return a Promise object which resolves to nodemailer 'info' object
    // info.accepted, info.rejected, info.response, info.envelope, info.messageId
    // will be resoled in mailRouter
    return (
        orderEmail
            .render(locals)                         // Promise from email-template
            .then(results => {                      // resolves with results object
                // console.log('result:', results);
                return transporter.sendMail({
                    from: `вразрезе.рф <${process.env.MAIL_ADDRESS}>`,
                    to: 'e.i.eremeev@gmail.com',
                    subject: 'Пробный заказ!',
                    html: results.html
                })
            })
    ); // return
        
} // sendOrder


module.exports = sendOrder;
