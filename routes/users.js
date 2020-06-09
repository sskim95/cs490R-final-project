const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const models = require('../models')
const bcrypt = require("bcrypt")
const router = express.Router()

const User = models.User

router.get("/", function(req, res) {
    User.find({})
    //.populate('name', 'email')
    .then(function(products) {
        res.json([products])
    })
    .catch(function(err) {
        res.status(500)
        res.json({success: false, error: err})
    })
})

//Updating the user
router.patch("/:id", getUser, async (req, res) => {
    if (req.user._id.equals(res.user._id) || req.user.isAdmin) {
        bcrypt.compare(req.body.password, res.user.password, async function(err, isMatch) {
            if (err) {
                throw err
            }
            if (!isMatch) {
                res.status(401).send({success: false, message: "Password doesn't match"})
            } else {
                if (req.body.email != null) {
                    res.user.email = req.body.email
                }
                if (req.body.newpassword != null) {
                    res.user.password = req.body.password
                }
                if (req.body.name != null) {
                    res.user.name = req.body.name
                }
                if (req.body.major != null) {
                    res.user.major = req.body.major
                }
                try {
                    const updatedUser = await res.user.save()
                    res.status(200)
                    res.json(updatedUser)
                } catch(err) {
                    res.status(400).json({message: err.message})
                }
            } 
        })
    } else {
        //User didn't create this user, so user cannot edit it.
        res.status(401).send({message: "Unauthorized User"})
    }
})

//Deleting the user
router.delete('/:id', getUser, async (req, res) => {
    if (req.user._id.equals(res.user._id) || req.user.isAdmin) {
        bcrypt.compare(req.body.password, res.user.password, async function(err, isMatch) {
            if (err) {
                throw err
            }
            if (!isMatch) {
                res.status(401).send({ message: "You entered a  wrong password!" })
            } else {
                try {
                    await res.user.remove()
                    res.status(200)
                    res.json({ message: 'Deleted user' })
                } catch(err) {
                    res.status(500).json({ message: err.message })
                }
            } 
        })
    } else {
        res.status(401).send({ message: "Unauthorized User" })
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