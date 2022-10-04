const mongoose = require('mongoose')

const subcategorySchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Category'
    },
    subcategory_name: {
        type: String,
        requird: [true, 'Enter category name'],

    }, status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Subcategory', subcategorySchema)