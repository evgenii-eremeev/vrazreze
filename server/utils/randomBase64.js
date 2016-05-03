"use strict";

const base64Url = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function randomBase64(length) {
    let result = "",
        randInt;
    for (let i = 0; i < length; i++) {
        randInt = Math.floor(Math.random() * 64);
        result += base64Url.substr(randInt, 1);
    }
    return result;
}

randomBase64.base64Url = base64Url;

module.exports = randomBase64;
