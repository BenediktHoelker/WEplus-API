let express = require('express');
let app = express();
let router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

// // Mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let DeliverySchema = require('../models/delivery.server.model');
let DeviationTypeSchema = require('../models/deviation-type.server.model');

//Try/Catch block to check whether the models exist
let Delivery;
let DeviationType;
try {
  Delivery = mongoose.model('Delivery');
  DeviationType = mongoose.model('DeviationType');
} catch (error) {
  Delivery = mongoose.model('Delivery', DeliverySchema);
  DeviationType = mongoose.model('DeviationType', DeviationTypeSchema);
}

app.get('/', function (request, response) {
  response.send('OK');
});

router.route('/api/deliveries')
  .get(function (request, response) {
    Delivery.find(function (err, deliveries) {
      if (err) return console.error(err);
      response.json(deliveries);
    });
  })

  .post(jsonParser, function (request, response) {
    let submittedDelivery = request.body;
    console.log(submittedDelivery);
    /**
    * Create a new ObjectID if object does not exist 
    * (otherwise mongoose would create _id=null
    */
    let query = { _id: submittedDelivery._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    if (!submittedDelivery.supplier || !submittedDelivery.carrier) {
      response.sendStatus(400);
      return false;
    }

    Delivery.findOneAndUpdate(query, submittedDelivery, { upsert: true, new: true }, function (err, doc) {
      console.log(submittedDelivery);
      console.log((doc));
      if (err) return response.send(500, ({ error: err }));
      return response.json(doc);
    });
  });

router.route('/api/deviationTypes')
  .get(function (request, response) {
    DeviationType.find(function (err, deviationTypes) {
      if (err) return console.error(err);
      response.json(deviationTypes);
    });
  });

// router.route('/:name')
//   .get(function (request, response) {
//     client.hget('cities', request.params.name, function (error, description) {
//       response.render('show.ejs', { city: { name: request.params.name, description: description } });
//     });
//   })

//   .delete(function (request, response) {
//     let city = request.params.name;
//     if (city) {
//       client.hdel('cities', city, function (error) {
//         if (error) throw error;
//         response.sendStatus(204);
//       });
//     }
//   });

module.exports = router;
