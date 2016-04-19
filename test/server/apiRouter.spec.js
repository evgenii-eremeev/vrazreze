"use strict";

const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const expect = require('expect');
const mongoose = require('mongoose');

const User = require('../../server/models/user');
const Category = require('../../server/models/category');

const server = supertest.agent("http://localhost:5000");
mongoose.connect('mongodb://localhost:27017/vrazreze');

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

    describe('/api/new_drawing (admin)', function () {
        let lastDrawingId;
        this.timeout(5000);

        before(createSuperUser);

        after(deleteUser);

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
    
    describe('/api/delete_drawing/:drawingId (admin)', function _describeDeleteDrawing () {
        let lastDrawingId;
        let lastDrawingPicture;
        this.timeout(5000);

        before(createSuperUser);

        after(deleteUser);

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
        
        after(deleteUser);
        
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
    
    describe('/api/add_category', function () {
        this.timeout(5000);

        before(createSuperUser);

        after(deleteUser);
                
        const formData = {
            name: 'Power stations',
            url: 'pstations',
            position: 99
        };
        
        afterEach(function (done) {
            Category.findOneAndRemove({ name: formData.name }, done)
        });

        
        it('return 200 and json content type', function (done) {
            server
                .post('/api/add_category')
                .set('Accept', 'application/json')
                .send({formData: formData})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        
        
        it('returns right category', function (done) {
            server
                .post('/api/add_category')
                .send({formData: formData})
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.name).toBe(formData.name);
                    expect(res.body.url).toBe(formData.url);
                    expect(res.body.position).toBe(formData.position);
                    done();
                });
        });
        
            
          
    });
    
    describe('/api/update_category/:categoryId', function () {
        this.timeout(5000);
        
        let recentCategoryId;
        const formDataBefore = {
            name: 'Power stations',
            url: 'pstations',
            position: 99
        };
        
        const formDataAfter = {
            name: 'Cool Stations',
            url: 'cstations',
            position: 49
        }

        before(createSuperUser);
        after(deleteUser);
        
        beforeEach(function (done) {
            server
                .post('/api/add_category')
                .set('Accept', 'application/json')
                .send({ formData: formDataBefore })
                .expect(200, function(err, res) {
                    if (err) { throw err; }
                    recentCategoryId = res.body._id;
                    console.log(recentCategoryId);
                    done();
                });
        });
        
        afterEach(function (done) {
            Category.findOneAndRemove({ _id: recentCategoryId }, done)
        });
        
        it('return 200 and json content type', function (done) {
            server
                .post(path.join('/api/update_category', recentCategoryId))
                .set('Accept', 'application/json')
                .send({formData: formDataAfter})
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        
        
        it('returns right category', function (done) {
            server
                .post(path.join('/api/update_category', recentCategoryId))
                .set('Accept', 'application/json')
                .send({formData: formDataAfter})
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.body.name).toBe(formDataAfter.name);
                    expect(res.body.url).toBe(formDataAfter.url);
                    expect(res.body.position).toBe(formDataAfter.position);
                    done();
                });
        });
        
    });
    
    
    describe('/api/delete_category/:categoryId', function () {
        
        this.timeout(5000);
        let recentCategoryId;
        
        const formData = {
            name: 'Power stations',
            url: 'pstations',
            position: 99
        };
        
        before(createSuperUser);
        after(deleteUser);
        
        beforeEach(function (done) {
            server
                .post('/api/add_category')
                .set('Accept', 'application/json')
                .send({ formData: formData })
                .expect(200, function(err, res) {
                    if (err) { throw err; }
                    recentCategoryId = res.body._id;
                    console.log(recentCategoryId);
                    done();
                });
        });
        
        
        it('returns 200 on success', function (done) {
            server
                .delete(path.join('/api/delete_category', recentCategoryId))
                .expect(200, done);
        });
        
        it('returns 404 on failure', function (done) {
            server
                .delete(path.join('/api/delete_category', '123')) 
                .expect(404, done);
        });
        
        it('no records left in database', function (done) {
            server
                .delete(path.join('/api/delete_category', recentCategoryId))
                .expect(200, function(err, res) {
                    expect(
                        Category.find({ _id: recentCategoryId }).count()
                    ).toBe(0);
                    done();
                });
        });
        
    });
    
});
