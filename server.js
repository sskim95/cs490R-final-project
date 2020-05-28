require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const eventsRouter = require('./routes/events')

mongoose.connect("mongodb://mongo:27017/acemdb", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const app = express()
        const db = mongoose.connection
        db.on('error', (error) => console.error(error))
        db.once('open', () => console.log('Connected to Database'))
        app.use(express.json())
        app.use('/events', eventsRouter)

        app.listen(3000, () => {
            console.log('Server Started')
        })
    })




