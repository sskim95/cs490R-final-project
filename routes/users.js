const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const models = require('../models')
const bcrypt = require("bcrypt")
const router = express.Router()

const User = models.User

//Getting all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500)
        res.json({ success: false, error: err });
    }
})

//Updating the user
router.patch("/:id", getUser, async (req, res) => {
    if (req.user._id.equals(res.user._id)) {
        bcrypt.compare(req.body.password, res.user.password, async function(err, isMatch) {
            if (err) {
                throw err
            }
            if (!isMatch) {
                res.status(401).send({success: false, message: "Password not match"})
            } else {
                res.status(200).send({success: true, message: "Password matched"})
                res.user.password = req.body.newPassword
            } try {
                const updatedUser = await res.user.save()
                res.json(updatedUser)
            } catch(err) {
                res.status(400).json({message: err.message})
            }
        })
    } else {
        res.status(401).send({message: "Unauthorized User"})
    }
})

async function getUser(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router