"use strict";

const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate
const transporter = require('./transporter');

// create resetPasswordEmail template
const templateDir = path.join(__dirname, 'templates', 'resetTemplate');
const resetTemplate = new EmailTemplate(templateDir);

module.exports = function sendResetPasswordEmail(email, token) {
    // locals is the container for variables that could be used in template
    // for example you could not use locals.user.name in template, just user.name
    const locals = {
        email: email,
        token: token
    };

    // return a Promise object which resolves to nodemailer 'info' object
    // info.accepted, info.rejected, info.response, info.envelope, info.messageId
    return (
        resetTemplate
            .render(locals)                         // Promise from email-template
            .then(results => {                      // resolves with results object
                // console.log('result:', results);
                return transporter.sendMail({
                    from: `вразрезе.рф <${process.env.EMAIL_ADDRESS}>`,
                    to: email,
                    subject: results.subject,
                    html: results.html
                })
            })
    ); // return
};
