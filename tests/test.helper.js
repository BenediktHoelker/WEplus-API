import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import config from '../config/config';

import Delivery from '../models/delivery.model';
import deliveries from './deliveries.test-data';
import factory from './factory';

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
  for (var i = 0; i <= 1; i++) {
    let delivery = factory.create('delivery');
  }
}