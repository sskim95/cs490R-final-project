const mongoose = require('mongoose')

/*
{
	"eventCourse": "Test 2 course",
	"eventPlace": "Test 2 place",
	"eventCapacity": 5
}
*/
const eventSchema = new mongoose.Schema({
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
    },
    //kind of foriegn key
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference user model
    }
})

module.exports = mongoose.model('Event', eventSchema)