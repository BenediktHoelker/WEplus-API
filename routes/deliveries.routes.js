let bodyParser = require('body-parser');
let deliveries = require('../controllers/deliveries.controller');
let express = require('express');
let mongoose = require('mongoose');
let app = express();
let deliveriesRouter = express.Router();
let jsonParser = bodyParser.json();

app.get('/', function (request, response) {
  response.send('OK');
});

deliveriesRouter.route('/api/deliveries')
  .get(deliveries.list)
  .post(jsonParser, deliveries.submit)
  .delete(deliveries.delete);

module.exports = deliveriesRouter;
