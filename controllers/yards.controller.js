let mongoose = require('mongoose'),
    YardSchema = require('../models/yard.model'),
    Yard = mongoose.model('Yard', YardSchema);

exports.list = function (request, response) {
    Yard.find(function (err, yards) {
        if (err) return console.error(err);
        response.json(yards);
    });
};