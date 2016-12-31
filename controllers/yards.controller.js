let mongoose = require('mongoose'),
    YardSchema = require('../models/yard.server.model'),
    Yard = mongoose.model('Yard', YardSchema);

// Mongoose connection a19rn5o6
exports.list = function (request, response) {
    Yard.find(function (err, yards) {
        if (err) return console.error(err);
        response.json(yards);
    });
};