const mongoose = require('mongoose')

const superAdminSchema = mongoose.Schema({
    name: {
        type: String,
        requird: [true, 'Enter Superadmin name']
    },
    phone: {
        type: String,
        requird: [true, 'Enter Superadmin phone']
    },
    email: {
        type: String,
        requird: [true, 'Enter Superadmin email'],
        unique: true
    }, password: {
        type: String,
        requird: [true, 'Enter Superadmin password']
    },
    role: {
        type: String,
        default: 'super_admin'
    }, status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Superadmin', superAdminSchema)