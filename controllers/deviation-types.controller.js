let mongoose = require('mongoose'),
    DeviationTypeSchema = require('../models/deviation-type.model'),
    DeviationType = mongoose.model('DeviationType', DeviationTypeSchema);

exports.list = function (request, response) {
    DeviationType.find(function (err, deviationTypes) {
      if (err) return console.error(err);
      response.json(deviationTypes);
    });
};