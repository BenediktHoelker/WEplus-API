import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import config from '../config/config';

import Delivery from '../models/delivery.model';
import deliveries from './deliveries.test-data';

mockgoose(mongoose);

/*
 * Removes earlier existing test data
 * @param {function} done callback function
 * @returns {void}
 */
module.exports.clearDB = (done) => {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function () { });
  }
};

/*
 * Creates and/or connects to a mongo test database in memory
 * @param {function} done callback function
 * @returns {void}
 */
module.exports.createDB = (done) => {
  mongoose.connect(config.db.test, done);
};

/*
 * Disconnects from and destroys the mongo test database in memory
 * @returns {void}
 */
module.exports.destroyDB = () => {
  mongoose.disconnect();
};

/*
 * Deletes all mongoose models
 * @returns {void}
 */
module.exports.deleteModels = () => {
  delete mongoose.models.Delivery;
  delete mongoose.models.Deviation;
  delete mongoose.models.DeviationType;
  delete mongoose.models.Yard;
  delete mongoose.models.YardDelivery;
};

/*
 * Fills test database with mock data
 * @returns {void}
 */
module.exports.fillDB = () => {
  var deliveries =
    [new Delivery({ "timeslotBegin": "2017-01-17T08:00:00Z", "timeslotEnd": "2017-01-17T08:30:00Z", "carrier": "Deutsche Post", "supplier": "Magna", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] }),
    new Delivery({ "timeslotBegin": "2017-01-17T08:30:00Z", "timeslotEnd": "2017-01-17T09:00:00Z", "carrier": "Schenker", "supplier": "Denso", "yardDeliveries": [{ "quantity": 0, "yard": { "name": "Yard 1" } }, { "quantity": 0, "yard": { "name": "Yard 2" } }, { "quantity": 0, "yard": { "name": "Yard 3" } }, { "quantity": 0, "yard": { "name": "Express" } }] })];

  deliveries.map(delivery => delivery.save());
}