var request = require('supertest');
var app = require('./app');
var mongoose = require('mongoose');
var sinon = require('sinon');

// var redis = require('redis');
// var client = redis.createClient();
// client.select('test'.length);
// client.flushdb();

describe('Create Mongoose Connection', function () {
  before(function () {
    createMongooseConnection();
  });
  after(function () {
    closeMongooseConnection();
  });

  describe('Requests to the root path', function () {
    it('Returns a 200 status code', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function (error) {
          if (error) throw error;
          done();
        });
    });
  });

  describe('Listing deliveries on /api/deliveries', function () {
    it('Returns 200 status code', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
    it('Returns JSON format', function (done) {
      request(app)
        .get('/')
        .expect('Content-Type', /json/, done);
    });
    // it('Returns initial deliveries', function (done) {
    //   request(app)
    //     .get('/')
    //     .expect(JSON.stringify([]), done);
    // });
  });
});

var createMongooseConnection = function () {
  mongoose.connect('mongodb://heroku_0f2332mm:c14h68629n8o2kal3qu8k08cpb@ds113938.mlab.com:13938/heroku_0f2332mm/api/deliveries');
  var db = mongoose.connection;
}

var closeMongooseConnection = function () {
  mongoose.connection.close()
}

