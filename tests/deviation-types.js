
var app = require('../app');
var config = require('../config/config');

var request = require('supertest');
var mongoose = require('mongoose');
var sinon = require('sinon');

describe('Deliveries', function () {
  beforeEach((done) => {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function () { });
      }
      return done();
    }
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.db.test, function (err) {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  afterEach((done) => {
    delete mongoose.models.Delivery;
    delete mongoose.models.Deviation;
    delete mongoose.models.DeviationType;
    delete mongoose.models.Yard;
    delete mongoose.models.YardDelivery;
    mongoose.connection.close(done);
  });

  describe('Listing deliveries on /api/deliveries', function () {
    it('Returns 200 status code', function (done) {
      request(app)
        .get('/api/deliveries')
        .expect(200)
        .end(function (error) {
          if (error) throw error;
          done();
        });
    });
    it('Returns JSON format', function (done) {
      request(app)
        .get('/api/deliveries')
        .expect('Content-Type', /json/)
        .end(function (error) {
          if (error) throw error;
          done();
        });
    });
    it('Returns initial deliveries', function (done) {
      request(app)
        .get('/api/deliveries')
        .expect(JSON.stringify([]), done);
    });
  });

  describe('Creating new deliveries', function () {
    var delivery = { carrier: 'DB', supplier: 'Continental' };
    var invalidDelivery = { carrier: '', supplier: 'Continental' };
    it('Returns a 201 status code', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(delivery)
        .expect(201, done);
    });
    it('Returns the delivery name', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(delivery)
        .expect(/carrier/i, done);
    });
    it('Validates delivery carrier and supplier', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(invalidDelivery)
        .expect(400, done);
    });
  });
});

