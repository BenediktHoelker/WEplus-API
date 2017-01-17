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
mongoose.model('DeviationType', DeviationTypeSchema);
module.exports = DeviationTypeSchema;