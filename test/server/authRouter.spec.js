'use strict';

const supertest = require('supertest');
const expect = require('expect');

const User = require('../../server/models/user');
const server = supertest.agent("http://localhost:5000");

function createUserAndLogin(done) {
    const user = {
        username: 'test',
        password: '123'
    }
    server
        .post('/signup')
        .send(user)
        .expect(200, done);
}

function deleteUser(done) {
    User.findOneAndRemove({username: 'test'}, done);
}


describe('authRouter', function () {
    
    describe('/check_session (logged in)', function () {
        
        this.timeout(5000); // will not work without it
        before(createUserAndLogin);
        
        after(deleteUser);
        
        it('returns 200 and json', function (done) {
            server
                .post('/check_session')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        
        it('returns proper json data', function (done) {
            server
                .post('/check_session')
                .accept('json') // same as .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    
                    expect(res.body).toInclude({isLoggedIn: true});
                    done();
                });
        })
        
    });
    
    describe('/check_session (logged out)', function () {
        
        this.timeout(5000); // will not work without it
        
        it('returns 200 and json', function (done) {
            server
                .post('/check_session')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        
        it('returns proper json data', function (done) {
            server
                .post('/check_session')
                .accept('json') // same as .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    
                    expect(res.body).toInclude({isLoggedIn: false});
                    done();
                });
        })
        
    });
    
    describe('/signup', function () {
        
        this.timeout(5000);
        
        const user = {
            username: 'test',
            password: '123'
        }
        
        after(deleteUser);
        
        it('returns 200 and json on success. response data is correct.', function (done) {
            server
                .post('/signup')
                .type('json')
                .send(user)
                .accept('json')
                .expect(200, function _expect (err, res) {
                    if (err) { throw err; }
                    
                    expect(res.body).toIncludeKeys(
                        // see user model
                        ['username', '_id', 'role', 'salt', 'hash', 'register_date']
                    );
                    done();
                });
        });
        
        it('retuns 409 status code if user exist', function (done) {
            // we already created user 'test'
            server
                .post('/signup')
                .type('json')
                .send(user)
                .expect(409, done);
        });
        
    });
    
    describe('/login', function () {
        
        const user = {
            username: 'test',
            password: '123'
        }
        
        before(createUserAndLogin);
        
        after(deleteUser);
        
        beforeEach(function (done) {
            server.post('/logout').expect(200, done);
        });
        
        it('returns 200 and json', function (done) {
            server
                .post('/login')
                .type('json')
                .send(user)
                .accept('json')
                .expect(200, done);
        });
                
        it('returns user in json format', function (done) {
            server
                .post('/login')
                .type('json')
                .send(user)
                .accept('json')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    
                    expect(res.body).toIncludeKeys(
                        // see user model
                        ['username', '_id', 'role', 'salt', 'hash', 'register_date']
                    );
                    done();
                });
        });
        
        
        it('returns 401 Unauthorized if wrong username or password', function (done) {
            server
                .post('/login')
                .type('json')
                .send({username: 'wrong', password: 'wrong'})
                .expect(401, done);
        });
        
        
    });
    
    
    describe('/logout', function () {
        
        before(createUserAndLogin);
        after(deleteUser);
        
        it('returns 200 and proper text output', function (done) {
            server
                .post('/logout')
                .accept('text')
                .expect(200, function (err, res) {
                    if (err) { throw err; }
                    expect(res.text).toMatch(/logout/i);
                    done();
                })
        });
        
    });
    
});
