var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var sinon = require('sinon');

var app = require('../app');
var config = require('../config/config');
var DeliverySchema = require('../models/delivery.model');
var mongoose = require('mongoose');

var Delivery = mongoose.model('Delivery', DeliverySchema);


describe('Deliveries', function () {
  beforeEach((done) => {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.db.test, function (err) {
        if (err) {
          throw err;
        }
        return clearDB(done);
      });
    } else {
      return clearDB(done);
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
      var deliveries = Delivery.find((err, deliveries) => {
        request(app)
          .get('/api/deliveries')
          .expect(JSON.stringify(deliveries), done);
      });
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

  describe('Deleting a delivery', function () {
    var query = Delivery.where({ carrier: 'Schenker' });
    it('Returns status code 200', function (done) {
      query.findOne((err, delivery) => {
        console.log(delivery._id.toString());
        request(app)
          .delete('/api/deliveries')
          .query({ _id: delivery._id.toString() })
          .expect(200, done);
      });
    });

    it('Deletes delivery from DB', done => {
      Delivery.findOne({ carrier: 'Deutsche Post' }, (err, deliveryToRemain) => {
        Delivery.findOne({ carrier: 'Schenker' }, (err, deliveryToBeDeleted) => {
          request(app)
            .delete('/api/deliveries')
            .query({ _id: deliveryToBeDeleted._id.toString() })
            .end((err, result) => {
              Delivery.findOne((err, deliveryAfter) => {
                assert.equal(deliveryToRemain._id.toString(), deliveryAfter._id.toString());
                done();
              });
            });
        });
      });
    });
  });

  clearDB = (done) => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function () { });
    }
    var deliveries = [new Delivery({ "timeslotBegin": "2017-01-17T08:00:00Z", "timeslotEnd": "2017-01-17T08:30:00Z", "carrier": "Deutsche Post", "supplier": "Magna", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] }),
    new Delivery({ "timeslotBegin": "2017-01-17T08:30:00Z", "timeslotEnd": "2017-01-17T09:00:00Z", "carrier": "Schenker", "supplier": "Denso", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] })];
    deliveries.map(delivery => delivery.save());
    return done();
  }
});

