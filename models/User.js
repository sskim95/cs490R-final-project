const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

/*
{
    "email": "sungsoo@test.com",
    "password": "password",
    "name": "Sungsoo",
    "major": "Computer Science"
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