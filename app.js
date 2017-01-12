var express = require('express');
var app = express();
let mongoose = require('mongoose');

app.use(express.static('public'));

app.use(function (request, result, next) {
  //Website you wish to allow to connect
  result.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

mongoose.connect('mongodb://heroku_0f2332mm:c14h68629n8o2kal3qu8k08cpb@ds113938.mlab.com:13938/heroku_0f2332mm/api/deliveries');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var deliveries = require('./routes/deliveries');
var deviationTypes = require('./routes/deviation-types');
var yards = require('./routes/yards');

//for testing the route has to be '/', for DEV_ENV it has to be '/api/deliveries'
app.use('/', deliveries);
app.use('/', deviationTypes);
app.use('/', yards);

module.exports = app;
