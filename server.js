require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport')
const routes = require('./routes')

require ('./config/passport')(passport)

mongoose.connect("mongodb://mongo:27017/acemdb", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const app = express()
        const db = mongoose.connection
        db.on('error', (error) => console.error(error))
        db.once('open', () => console.log('Connected to Database'))
        app.use(express.json())
        app.use(cors());
        //Has no security to people signup
        app.use('/api/auth', routes.auth)
        //app.use('/events', routes.events)
        app.use("/api/events", passport.authenticate('jwt', { session : false }), routes.events)
        app.use("/api/users", passport.authenticate('jwt', { session : false }), routes.users)

        app.listen(3000, () => {
            console.log('Server Started')
        })
    })
    .catch(err => {
        console.error("Mongo Connection Error", err);
        process.exit();
    })
