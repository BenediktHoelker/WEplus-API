var Delivery = require('../models/delivery.model');

var deliveries = [
  new Delivery(
    { "timeslotBegin": "2017-01-17T08:00:00Z", "timeslotEnd": "2017-01-17T08:30:00Z", "carrier": "Deutsche Post", "supplier": "Magna", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] }
  ),
  new Delivery(
    { "timeslotBegin": "2017-01-17T08:30:00Z", "timeslotEnd": "2017-01-17T09:00:00Z", "carrier": "Schenker", "supplier": "Denso", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] })
];

module.exports = deliveries;