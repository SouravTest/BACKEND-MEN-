const mongoose = require('mongoose')

const superAdminSchema = mongoose.Schema({
    name: {
        type: String,
        requird: [true, 'Enter category name'],
    },
    email: {
        type: String,
        requird: [true, 'Enter a email'],
        unique: true
    }, password: {
        type: String,
        requird: [true, 'Enter password'],
    }, status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Superadmin', superAdminSchema)