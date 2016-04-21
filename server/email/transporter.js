'use strict';

const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

// load auth data
require('dotenv').load();

// config smtp
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

// attach htmlToText as a 'compile' handler for a nodemailer transport object
transporter.use('compile', htmlToText());

module.exports = transporter;