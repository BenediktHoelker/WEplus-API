'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Deviation Schema
 */
var DeviationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: '',
        trim: true,
        required: 'Type cannot be blank'
    },
    gravity: {
        type: Number,
        default: '',
        required: 'Gravity cannot be blank'
    }
});
module.exports = DeviationSchema;