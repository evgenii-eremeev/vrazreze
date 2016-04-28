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
            .field('title', 'Дом')
            .field('category', 'Промышленность')
            .field('description', 'утюг диод духи')
            .field('tags', 'дичь, топор, душ, клей')
            .field('price', 99999)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    before(function _createDrawing2 (done) {
        server
            .post('/api/new_drawing')
            .set('Content-Type', 'multipart/form-data')
            .field('title', 'Икона')
            .field('category', 'Промышленность')
            .field('description', 'кожа кит кекс')
            .field('tags', 'качан, куб, клей, душ')
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

        it('empty query. respons with 200 and json', function (done) {
            server
                .get('/api/search?q=')
                .accept('json')
                .expect(200, done);
        });

        it('should respond with empty array', function (done) {
            server
                .get('/api/search?q=abaracadabra')
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(0);
                    done();
                });
        });

        it('title search "дом". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('дом'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(1);
                    done();
                });
        });

        it('title search "дом икона". should respond with array of length 2', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('дом икона'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(2);
                    done();
                });
        });

        it('description search "утюг диод". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('утюг диод'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(1);
                    done();
                });
        });

        it('description search "кит кожа". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('кит кожа'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(1);
                    done();
                });
        });

        it('description search "кит кожа утюг диод". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('кит кожа утюг диод'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(2);
                    done();
                });
        });

        it('tags search "дичь". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('дичь'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(1);
                    done();
                });
        });

        it('tags search "качан". should respond with array of length 1', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('качан'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(1);
                    done();
                });
        });

        it('tags search "качан дичь". should respond with array of length 2', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('качан дичь'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(2);
                    done();
                });
        });

        it('tags search "клей". should respond with array of length 2', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('клей'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(2);
                    done();
                });
        });

        it('mixed search "дом кожа". should respond with array of length 2', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('дом кожа'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.length).toBe(2);
                    done();
                });
        });

        it('mixed search "икона утюг". should return most relevant results first', function (done) {
            server
                .get('/api/search?q=' + encodeURIComponent('икона утюг'))
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }

                    expect(res.body.length).toBe(2);

                    expect(
                        res.body[0].score
                    ).toBeGreaterThan(
                        res.body[1].score
                    );

                    expect(
                        res.body[0].title
                    ).toMatch(/икона/i);

                    expect(
                        res.body[1].description
                    ).toMatch(/утюг/i);

                    done();
                });
        });



    }); // describe
});
