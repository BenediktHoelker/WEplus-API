'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * DeviationType Schema
 */
var DeviationTypeSchema = new Schema({
    id: {
        type: Number,
        default: '',
    },
    name: {
        type: String,
        default: '',
        required: 'Name cannot be blank'
    }
});
module.exports = DeviationTypeSchema;