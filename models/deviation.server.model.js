'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeviationTypeSchema = require('./deviation-type.server.model');

/**
 * Deviation Schema
 */
var DeviationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    type: {
        type: DeviationTypeSchema,
        required: 'Type cannot be blank'
    },
    gravity: {
        type: Number,
        default: '',
        required: 'Gravity cannot be blank'
    }
});
module.exports = DeviationSchema;