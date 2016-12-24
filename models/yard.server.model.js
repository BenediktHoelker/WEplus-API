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
    },
    quantity: {
        type: Number,
        default: '',
        required: 'Quantity cannot be blank'
    }
});
module.exports = YardSchema;