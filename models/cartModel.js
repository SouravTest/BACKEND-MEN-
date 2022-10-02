const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        requird: true,
        default: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema)