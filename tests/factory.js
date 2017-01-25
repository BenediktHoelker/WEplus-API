// import factoryGirl from 'factory-girl';
import Delivery from '../models/delivery.model';
import faker from 'faker';

var factory = require('factory-girl').factory;
var anotherFactory = new factory.FactoryGirl();
let today = new Date();
let nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

anotherFactory.define('delivery', Delivery, {
  carrier: () => faker.company.companyName(),
  supplier: () => faker.company.companyName(),
  timeslotBegin: () => faker.date.between(today, nextWeek),
  timeslotEnd: () => faker.date.between(today, nextWeek),
  deviations: [],
  isRegistered: false,
  isProcessed: false,
  yardDeliveries: []
});

export default anotherFactory;