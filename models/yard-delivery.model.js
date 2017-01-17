'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var YardSchema = require('./yard.model');

/**
 * YardDelivery Schema
 */
var YardDeliverySchema = new Schema({
    yard: {
        type: YardSchema,
        default: '',
    },
    quantity: {
        type: Number,
        default: 0,
    }
});
mongoose.model('YardDelivery', YardDeliverySchema);
module.exports = YardDeliverySchema;