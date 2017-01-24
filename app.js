var express = require('express');
let mongoose = require('mongoose');
var seeder = require('mongoose-seed');
var deliveriesSeed = require('./seeds/deliveries.seed');
var deviationTypesSeed = require('./seeds/deviation-types.seed');
var yardsSeed = require('./seeds/yards.seed');

var app = express();
app.use(express.static('public'));

app.use(function (request, result, next) {
  //Website you wish to allow to connect
  result.setHeader('Access-Control-Allow-Origin', '*');
  result.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  result.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

// Connect to MongoDB via Mongoose 
// seeder.connect('mongodb://localhost/dev', function () {

//   // Load Mongoose models 
//   seeder.loadModels([
//     'models/delivery.model.js',
//     'models/deviation.model.js',
//     'models/deviation-type.model.js',
//     'models/yard.model.js',
//     'models/yard-delivery.model.js'
//   ]);

//   // Clear specified collections 
//   seeder.clearModels(['Delivery', 'Deviation', 'DeviationType', 'Yard', 'YardDelivery'], function () {

//     // Callback to populate DB once collections have been cleared 
//     seeder.populateModels(deliveriesSeed, function () {
//       seeder.populateModels(deviationTypesSeed, function () {
//         seeder.populateModels(yardsSeed, function(){});
//       });
//     });
//   });
// });

// mongoose.connect('mongodb://localhost/dev');

// // mongoose.connect('mongodb://heroku_0f2332mm:c14h68629n8o2kal3qu8k08cpb@ds113938.mlab.com:13938/heroku_0f2332mm');
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

var deliveries = require('./routes/deliveries.routes');
var deviationTypes = require('./routes/deviation-types.routes');
var yards = require('./routes/yards.routes');

//for testing the route has to be '/', for DEV_ENV it has to be '/api/deliveries'
app.use('/', deliveries);
app.use('/', deviationTypes);
app.use('/', yards);

module.exports = app;
