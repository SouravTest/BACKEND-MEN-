const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    product_id: {
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