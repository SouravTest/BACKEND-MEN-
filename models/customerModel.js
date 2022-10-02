const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
    customer_name: {
        type: String,
        requird: [true, 'Enter Customer name']
    },
    mobile: {
        type: String,
        requird: [true, 'Enter Customer mobile']
    },
    email: {
        type: String,
        requird: [true, 'Enter Customer email'],
        unique: true
    },
    password: {
        type: String,
        requird: [true, 'Enter Customer name']
    },
    gender: {
        type: String,
        requird: [true, 'Enter Customer gender']
    },
    pincode: {
        type: String,
        requird: [true, 'Enter Customer pincode']
    },
    city: {
        type: String,
        requird: [true, 'Enter Customer city']
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema)