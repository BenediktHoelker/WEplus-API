let bodyParser = require('body-parser');
let Deliveries = require('../controllers/deliveries.controller');
let express = require('express');
let mongoose = require('mongoose');
let app = express();
let deliveriesRouter = express.Router();
let jsonParser = bodyParser.json();

app.get('/', function (request, response) {
  response.send('OK');
});

deliveriesRouter.route('/api/deliveries')
  .get(Deliveries.list)
  .post(jsonParser, Deliveries.submit);

  // .delete(function (request, response) {
  //   let delivery = request.params.name;
  //   if (city) {
  //     client.hdel('cities', city, function (error) {
  //       if (error) throw error;
  //       response.sendStatus(204);
  //     });
  //   }
  // });

module.exports = deliveriesRouter;
