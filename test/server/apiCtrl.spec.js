const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../../server/models/user');

const server = supertest.agent("http://localhost:5000");
mongoose.connect('mongodb://localhost:27017/vrazreze');

describe("apiCtrl", function () {

    describe('.categories', function () {

        it('returns 200 and json object', function (done) {
            server
                .get('/api/categories')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

    });

    describe('.category', function () {

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

    });

    describe('.newDrawing', function () {
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
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        after(function (done) {
            User.findOneAndRemove({username: 'test'}, done);
        });

        afterEach(function (done) {
            server
                .delete('/api/delete_drawing/' + lastDrawingId)
                .expect(200, done);
        });

        it('adds new drawing to database', function (done) {
            const drawing = {
                title: 'Drawing title',
                category: 'Промышленность',
                description: "Testing description",
            }
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

    });


    //
    // describe('.deleteDrawing', function () {
    //
    //     it('returns 200 on successfull deleting', function (done) {
    //         server
    //             .delete('/api/category')
    //     });
    // });


});
