var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Mongoose connection
require('../models/delivery.server.model');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var router = express.Router();

app.get('/', function (request, response) {
  response.send('OK');
});

var Delivery = mongoose.model('Delivery');

router.route('/')
  .get(function (request, response) {

    Delivery.find(function (err, deliveries) {
      if (err) return console.error(err);
      console.log(deliveries);
      response.json(deliveries);
    });
  })

  .post(jsonParser, function (request, response) {
    var submittedDelivery = request.body;

    /**
    * Create a new ObjectID if object does not exist 
    * (otherwise mongoose would create _id=null
    */
    var query = { _id: submittedDelivery._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    console.log(query);
    console.log(submittedDelivery);
    if (!submittedDelivery.quantity || !submittedDelivery.carrier
      || !submittedDelivery.supplier) {
      response.sendStatus(400);
      return false;
    }

    Delivery.findOneAndUpdate(query, submittedDelivery, { upsert: true, new: true }, function (err, doc) {
      if (err) return response.sendStatus(500).body({ error: err });
      return response.json(doc);
    });
  });

router.route('/:name')
  .get(function (request, response) {
    client.hget('cities', request.params.name, function (error, description) {
      response.render('show.ejs', { city: { name: request.params.name, description: description } });
    });
  })

  .delete(function (request, response) {
    var city = request.params.name;
    if (city) {
      client.hdel('cities', city, function (error) {
        if (error) throw error;
        response.sendStatus(204);
      });
    }
  });

module.exports = router;
