const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const expect = require('expect');
const mongoose = require('mongoose');
const User = require('../../server/models/user');

const server = supertest.agent("http://localhost:5000");
mongoose.connect('mongodb://localhost:27017/vrazreze');

describe("apiRouter", function () {

    describe('/api/categories', function () {

        it('returns 200 and json object', function (done) {
            server
                .get('/api/categories')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

    }); // describe

    describe('/api/category/:categoryId', function () {

        it('returns 200 and json object', function (done) {
            server
                .get('/api/category/mashinostroenie')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('returns 404 if not found', function (done) {
            server
                .get('/api/category/randomcat')
                .set('Accept', 'application/json')
                .expect(404, done);
        });

    }); // describe

    describe('/api/delete_drawing/:drawingId (admin)', function () {
        let lastDrawingId;
        this.timeout(5000);

        before(function(done) {
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
        });

        after(function (done) {
            User.findOneAndRemove({username: 'test'}, done);
        });

        afterEach(function (done) {
            server
                .delete('/api/delete_drawing/' + lastDrawingId)
                .expect(200, done);
        });

        it('returns 200 and json object', function (done) {
            server
                .post('/api/new_drawing')
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'Drawing for testing')
                .field('category', 'Промышленность')
                .field('description', 'Testing description')
                .attach('picture', __dirname + '/../testpic.jpg')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    if (err) { throw err; }
                    lastDrawingId = res.body._id;
                    done();
                });
        });

        it('does write to database', function (done) {
            server
                .post('/api/new_drawing')
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'Drawing for testing')
                .field('category', 'Промышленность')
                .field('description', 'Testing description')
                .field('drawing_composition', '1, 2, 3')
                .field('tags', '1, 2, 3')
                .field('price', '200')
                .attach('picture', __dirname + '/../testpic.jpg')
                .expect('Content-Type', /json/)
                .expect(function(res) {

                    expect(
                        res.body.title
                    ).toBe('Drawing for testing');

                    expect(
                        res.body.category
                    ).toBeA('string');

                    expect(
                        res.body.description
                    ).toBe('Testing description');

                    expect(
                        res.body.picture
                    ).toMatch(/picture/);

                    expect(
                        res.body.drawing_composition
                    ).toBeA('array');

                    expect(
                        res.body.tags
                    ).toBeA('array');

                    expect(
                        res.body.price
                    ).toBeA('number').toBe(200);

                })
                .expect(200, function(err, res) {
                    if (err) { throw err; }
                    lastDrawingId = res.body._id;
                    done();
                });
        });

        it('does load picture to filesystem', function _it (done) {

            server
                .post('/api/new_drawing')
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'Drawing for testing')
                .field('category', 'Промышленность')
                .field('description', 'Testing description')
                .attach('picture', __dirname + '/../testpic.jpg')
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    if (err) { throw err; }
                    lastDrawingId = res.body._id;
                    const pathToPic = path.join(
                        __dirname,
                        '/../../public/pics/',
                        res.body.picture
                    );
                    // checks if file exist
                    fs.stat(pathToPic, function(err, stat) {
                        if (err) { throw err; }
                        done()
                    });
                });
        }); // it

    }); // describe
    
    describe('/api/new_drawing (admin)', function _describeDeleteDrawing () {
        let lastDrawingId;
        let lastDrawingPicture;
        this.timeout(5000);

        before(function(done) {
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
        });

        after(function _after (done) {
            User.findOneAndRemove({username: 'test'}, done);
        });

        beforeEach(function _beforeEach (done) {
            server
                .post('/api/new_drawing')
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'Drawing for testing')
                .field('category', 'Промышленность')
                .field('description', 'Testing description')
                .attach('picture', __dirname + '/../testpic.jpg')
                .expect(200, function _expect (err, res) {
                    if (err) { throw err; }
                    lastDrawingId = res.body._id;
                    lastDrawingPicture = res.body._id;
                    done();
                });
        });

        it('returns 200 on successfull deleting', function _it (done) {
            server
                .delete(path.join('/api/delete_drawing/', lastDrawingId))
                .expect(200, done);
        }); // it

        it('deletes picture from filesystem', function _it (done) {
            server
                .delete(path.join('/api/delete_drawing/', lastDrawingId))
                .expect(200, function _expect (err, res) {
                    if (err) { throw err; }
                    const pathToPic = path.join(
                        __dirname,
                        '/../../public/pics/',
                        lastDrawingPicture
                    );
                    fs.stat(pathToPic, function _fsstat(err, stat) {
                        expect(err.code).toBe("ENOENT");
                        done();
                    });
                });
        }); // it
    }); // describe

    describe('Not admin', function () {
        
        this.timeout(5000);
        
        before(function(done) {
            const user = {
                username: 'test',
                password: '123'
            }
            server
                .post('/signup')
                .send(user)
                .expect(200, done);
        });
        
        after(function (done) {
            User.findOneAndRemove({username: 'test'}, done);
        });
        
        it('post to /api/new_drawing responds with 403 Forbidden', function (done) {
            server
                .post('/api/new_drawing')
                .set('Content-Type', 'multipart/form-data')
                .field('title', 'Drawing for testing')
                .field('category', 'Промышленность')
                .field('description', 'Testing description')
                .attach('picture', __dirname + '/../testpic.jpg')
                .expect(403, done);
        });
        
        
        it('post to /api/add_category responds with 403 Forbidden', function (done) {
            server
                .post('/api/add_category')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({foo: 'bar'})
                .expect(403, done);
        });
        
        it('post to /api/update_category/:categoryId responds with 403 Forbidden', function (done) {
            server
                .post('/api/update_category/id123')
                .send({foo: 'bar'})
                .expect(403, done);
        });
        
        it('delete to /api/delete_category/:categoryId responds with 403 Forbidden', function (done) {
            server
                .delete('/api/delete_category/id123')
                .send({foo: 'bar'})
                .expect(403, done);
        });
        
        
        it('delete to /api/delete_drawing/:drawingId responds with 403 Forbidden', function (done) {
            server
                .delete('/api/delete_drawing/:id123')
                .send({foo: 'bar'})
                .expect(403, done);
        });
        
        

    }); // describe
    
    describe('/api/update_category/:categoryId', function () {
        // TODO
    });
    
    
});
