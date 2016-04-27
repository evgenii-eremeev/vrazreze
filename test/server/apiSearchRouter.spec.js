"use strict";

const supertest = require('supertest');
const expect = require('expect');

const Drawing = require('../../server/models/drawing');
const User = require('../../server/models/user');
const server = supertest.agent("http://localhost:5000");

function createSuperUser(done) {
    const user = {
        username: 'test',
        password: '123'
    }
    server
        .post('/signup')
        .send(user)
        .expect(200, function _changeRole (err, res) {
            User.update(
                { username: 'test' },
                { $set: { role: 'admin' }},
                function _updateUser (err, doc) {
                    if (err) { throw err; }
                    done();
                }
            );
        });
}

function deleteUser(done) {
    User.findOneAndRemove({username: 'test'}, done);
}

describe('apiSearchRouter', function () {

    before(createSuperUser);

    after(deleteUser);

    before(function _createDrawing1 (done) {
        server
            .post('/api/new_drawing')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'ЗИЛ-131')
            .field('category', 'Промышленность')
            .field('description', 'Стол рация арфа роза руль рапан')
            .field('tags', 'ручка, рак, радио, рога')
            .field('price', 99999)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    before(function _createDrawing2 (done) {
        server
            .post('/api/new_drawing')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'КрАЗ')
            .field('category', 'Промышленность')
            .field('description', 'Рюмка фара вафля весы вилы вобла')
            .field('tags', 'ручка, рак, овощ, вакса')
            .field('price', 99999)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    after(function _deleteTestingDrawings(done) {
        Drawing.remove({price: 99999}, done);
    });

    describe('/api/search', function () {

        it('responds with json object, status 200', function (done) {
            server
                .get('/api/search')
                .accept('json')
                .expect(200, done);
        });



    }); // describe
});
