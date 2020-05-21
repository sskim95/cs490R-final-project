const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    eventCourse: {
        type: String,
        requried: true
    },
    eventPlace: {
        type: String,
        requried: true
    },
    eventCapacity: {
        type: Number,
        requried: true
    },
    eventTime: {
        type: Date,
        requried: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)