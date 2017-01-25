import assert from 'assert';
import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import sinon from 'sinon';

import app from '../app';
import config from '../config/config';
import deliveries from './deliveries.test-data';
import Delivery from '../models/delivery.model';
import { clearDB, createDB, destroyDB, deleteModels, fillDB } from './test.helper';

let shoul = chai.should();

describe('Deliveries', function () {
  before((done) => {
    createDB(() => {
      done();
    });
  });

  after(() => {
    deleteModels();
    destroyDB();
  });

  beforeEach(() => {
    clearDB();
    fillDB();
  });

  describe('Listing deliveries on /api/deliveries', function () {
    it('should return 200 status code', function (done) {
      request(app)
        .get('/api/deliveries')
        .expect(200)
        .end(function (error) {
          if (error) throw error;
          done();
        });
    });
    it('should return JSON format', function (done) {
      request(app)
        .get('/api/deliveries')
        .expect('Content-Type', /json/)
        .end(function (error) {
          if (error) throw error;
          done();
        });
    });
    it('should return initial deliveries', function (done) {
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
    it('should return a 201 status code', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(delivery)
        .expect(201, done);
    });
    it('should return the delivery carrier', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(delivery)
        .expect(/carrier/i, done);
    });
    it('should validate delivery carrier and supplier', function (done) {
      request(app)
        .post('/api/deliveries')
        .send(invalidDelivery)
        .expect(400, done);
    });
  });

  describe('Deleting a delivery', function () {
    it('should return status code 200', function (done) {
      Delivery.findOne((err, delivery) => {
        request(app)
          .delete('/api/deliveries')
          .query({ _id: delivery._id.toString() })
          .expect(200, done);
      });
    });

    it('should delete delivery from DB', done => {
      let countBefore;
      let countAfter;

      Delivery.find((err, deliveriesBefore) => {
        countBefore = deliveriesBefore.length;
        request(app)
          .delete('/api/deliveries')
          .query({ _id: deliveriesBefore[0]._id.toString() })
          .then((err, result) => {
            Delivery.find((err, deliveriesAfter) => {
              countAfter = deliveriesAfter.length;
              countAfter.should.equal(countBefore -1);
              done();
            });
          });
      });
    });
  });
});

