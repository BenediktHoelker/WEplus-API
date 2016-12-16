var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(function (request, result, next) {
  //Website you wish to allow to connect
  result.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

var deliveries = require('./routes/deliveries');

//for testing the route has to be '/', for DEV_ENV it has to be '/api/deliveries'
app.use('/', deliveries);

module.exports = app;
