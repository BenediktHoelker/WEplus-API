let mongoose = require('mongoose'),
    DeviationTypeSchema = require('../models/deviation-type.server.model'),
    DeviationType = mongoose.model('DeviationType', DeviationTypeSchema);

// Mongoose connection a19rn5o6
exports.list = function (request, response) {
    DeviationType.find(function (err, deviationTypes) {
      if (err) return console.error(err);
      response.json(deviationTypes);
    });
};