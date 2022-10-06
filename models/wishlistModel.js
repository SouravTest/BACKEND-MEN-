const mongoose = require('mongoose')

const WishlistSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Product'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Wishlist', WishlistSchema)