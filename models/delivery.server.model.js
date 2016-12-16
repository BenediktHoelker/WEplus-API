'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeviationSchema = require('./deviation.server.model');
/**
 * Delivery Schema
 */
var DeliverySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    carrier: {
        type: String,
        default: '',
        trim: true,
        required: 'Carrier cannot be blank'
    },
    deviations: [DeviationSchema],    
    isRegistered: {
        type: Boolean,
        default: false
    },
    isProcessed: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: '',
        required: 'Quantity cannot be blank'
    },
    supplier: {
        type: String,
        default: '',
        trim: true,
        required: 'Supplier cannot be blank'
    }
});

module.exports = DeliverySchema;