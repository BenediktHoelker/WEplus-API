let express = require('express');
let app = express();
let router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

// // Mongoose connection
// mongoose.connect('mongodb://localhost/test');
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
let mongoose = require('mongoose');

let DeliverySchema = require('../models/delivery.server.model');

//Try/Catch block to check whether the model exists
let Delivery;
try {
  Delivery = mongoose.model('Delivery');
} catch (error) {
  Delivery = mongoose.model('Delivery', DeliverySchema);
}

app.get('/', function (request, response) {
  response.send('OK');
});

router.route('/')
  .get(function (request, response) {

    Delivery.find(function (err, deliveries) {
      if (err) return console.error(err);
      response.json(deliveries);
    });
  })

  .post(jsonParser, function (request, response) {
    let submittedDelivery = request.body;

    /**
    * Create a new ObjectID if object does not exist 
    * (otherwise mongoose would create _id=null
    */
    let query = { _id: submittedDelivery._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }

    if (!submittedDelivery.quantity || !submittedDelivery.carrier
      || !submittedDelivery.supplier) {
      response.sendStatus(400);
      return false;
    }

    Delivery.findOneAndUpdate(query, submittedDelivery, { upsert: true, new: true }, function (err, doc) {
      if (err) return response.send(500, ({ error: err }));
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
    let city = request.params.name;
    if (city) {
      client.hdel('cities', city, function (error) {
        if (error) throw error;
        response.sendStatus(204);
      });
    }
  });

module.exports = router;
