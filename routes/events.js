const express = require('express')
const models = require('../models')
const router = express.Router()

const Event = models.Event

router.use( (req, res, next) => {
  //do logging
  console.log("A request came in...")
  next();
});

//testAPI
router.get("/testAPI", function(req, res) {
  const resObject = {
    message: "Test API is working",
    user: req.user
  }
  return res.send(resObject)
});

// Getting all
router.get('/', async (req, res) => {
    try {
      const events = await Event.find()
      res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getEvent, (req, res) => {
  Event.findOne({ _id: req.params.id })
  .populate('author', 'email')
  .then(function(event) {
    if (event) {
      res.json(event)
    } else {
      res.status(404)
      res.json({ error: "Event doesn't exist!"})
    }
  })
  .catch(function(err) {
    console.log(err)
    res.status(500)
    res.json({message: "Error", error: err})
  })
    
})

// Creating one
router.post('/', async (req, res) => {
    const event = new Event({
      eventCourse: req.body.eventCourse,
      eventPlace: req.body.eventPlace,
      eventCapacity: req.body.eventCapacity,
      author: req.user._id
    })
    try {
      const newEvent = await event.save()
      res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getEvent, async (req, res) => {
    if (req.body.eventCourse != null) {
      res.event.eventCourse = req.body.eventCourse
    }
    if (req.body.eventPlace != null) {
      res.event.eventPlace = req.body.eventPlace
    }
    if (req.body.eventCapacity != null) {
      res.event.eventCapacity = req.body.eventCapacity
    }
    try {
      const updatedEvent = await res.event.save()
      res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getEvent, async (req, res) => {
    try {
      await res.event.remove()
      res.json({ message: 'Deleted event' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getEvent(req, res, next) {
    let event
    try {
      event = await Event.findById(req.params.id)
      if (event == null) {
        return res.status(404).json({ message: 'Cannot find event' })
      }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
  
    res.event = event
    next()
}

module.exports = router