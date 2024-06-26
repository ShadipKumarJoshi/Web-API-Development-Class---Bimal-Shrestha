const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    // Admin fixation manually
    isAdmin: {
        type: Boolean,
        default: false
    },

    phone: {
        type: Number,
        required: true 
    },

    phone: {
        type: Number,
        required: true,
        unique: true 
    },

    resetPasswordOTP: {
        type: Number,
        default: null 
    },

    resetPasswordExpires: {
        type: Date,
        default: null 
    },

})

const User = mongoose.model('users', userSchema)
module.exports = User;
