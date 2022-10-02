const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        requird: [true, 'Enter category name'],

    }, status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)