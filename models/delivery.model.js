'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeviationSchema = require('./deviation.model');
var YardDeliverySchema = require('./yard-delivery.model');
/**
 * Delivery Schema
 */
var DeliverySchema = new Schema({
    id: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    timeslotBegin: {
        type: Date,
    },
    timeslotEnd: {
        type: Date,
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
    // quantity: {
    //     type: Number,
    //     default: '',
    //     required: 'Quantity cannot be blank'
    // },
    supplier: {
        type: String,
        default: '',
        trim: true,
        required: 'Supplier cannot be blank'
    },
    yardDeliveries: [YardDeliverySchema]
});
mongoose.model('Delivery', DeliverySchema);
module.exports = DeliverySchema;