const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const config = require('../config/config')

const router = express.Router();

router.post('/signup', (req, res) => {
    if (! req.body.email || ! req.body.password) {
        res.status(400)
        res.json({success: false, message: "Email and Password Required"})
    } else {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            major: req.body.major
        })
        newUser.save((err) => {
            if (err) {
                console.log(err)
                res.status(400)
                return res.json({success: false, message: "Email already exists"})
            }
            res.json({
                success: true,
                message: "Created User",
                user: newUser
            })
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email}, function(err,user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, message: "User not found."})
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch) {
                    // token has id and email
                    const tokenObj = { _id: user._id, email: user.email }
                    const token = jwt.sign(tokenObj, config.secret)
                    res.send({success: true, token: 'JWT ' + token})
                } else {
                    res.status(401).send({success: false, message: "Wrong Password"})
                }
            })
        }
    })
})

router.patch('/:id', getUser, async (req, res) => {
    if (req.user._id.equals(res.user._id) || req.user.isAdmin) {
        bcrypt.comparePassword(req.body.password, res.user.password, async function(err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                res.status(401)
                res.send({success: false, message: "Password doesn't match"})
            } else {
                res.status(200)
                res.send({success: true, message: "Password changed"})
                res.user.password = req.body.newPassword
            } try {
                const updatedUser = await res.user.save()
                res.json(updatedUser)
            } catch(err) {
                res.status(400)
                res.json({message: err.message})
            }
        })
    } else {
        res.status(401)
        res.send({message: "Unauthorized User"})
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: "Cannot find user"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

module.exports = router;