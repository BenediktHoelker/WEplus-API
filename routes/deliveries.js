var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
require('../models/delivery.server.model');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var router = express.Router();

app.get('/', function (request, response) {
  response.send('OK');
});

router.route('/')
  .get(function (request, response) {
    var Delivery = mongoose.model('Delivery');
    Delivery.find(function (err, deliveries) {
      if (err) return console.error(err);
      console.log(deliveries);
      response.json(deliveries);
    });
  })

  .post(urlencode, function (request, response) {
    var newCity = request.body;
    if (!newCity.name || !newCity.description) {
      response.sendStatus(400);
      return false;
    }
    client.hset('cities', newCity.name, newCity.description, function (error) {
      if (error) throw error;
      response.status(201).json(newCity.name);
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
