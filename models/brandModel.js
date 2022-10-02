const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    brand_name: {
        type: String,
        requird: [true, 'Enter brand name'],

    }, status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Brand', brandSchema)