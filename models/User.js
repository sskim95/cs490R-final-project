const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

/*
{
    "email": "ad@ad.com",
    "password": "admin",
    "name": "Admin name",
    "major": "Admin major"
}
{
    "email": "test1@test1.com",
    "password": "test1",
    "name": "Test1 name",
    "major": "Test1 major"
}
{
    "email": "test2@test2.com",
    "password": "test2",
    "name": "Test2 name",
    "major": "Test2 major"
}
*/
const UserSchema = mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    newpassword : {
        type: String,
        required: false
    },
    name : {
        type: String,
        required: true
    },
    major : {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    } else {
        return next()
    }
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch)
    })
}

UserSchema.methods.isAdmin = function() {
    return this.role === "admin"
}

module.exports = mongoose.model('User', UserSchema)