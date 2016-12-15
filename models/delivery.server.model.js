'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Delivery Schema
 */
var DeliverySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    carrier: {
        type: String,
        default: '',
        trim: true,
        required: 'Carrier cannot be blank'
    },
    supplier: {
        type: String,
        default: '',
        trim: true
    },
    quantity: {
        type: Number,
        default: ''
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    isProcessed: {
        type: Boolean,
        default: false
    }
});

var Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;