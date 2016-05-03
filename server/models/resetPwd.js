const User = require('./user.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vrazreze');

User
    .findByUsername("jay@mail.ru")
    .exec(function(err, user) {
        console.log(user);
        user.setPassword("321", function (err, newUser) {
            if (err) { throw err; }
            newUser.save();
            console.log(newUser);
        });
    })
