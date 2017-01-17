'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Yard Schema
 */
var YardSchema = new Schema({
    id: {
        type: Number,
        default: '',
        required: 'Quantity cannot be blank'
    },
    name: {
        type: String,
        default: '',
        required: 'Name cannot be blank'
    }
});
mongoose.model('Yard', YardSchema);
module.exports = YardSchema;