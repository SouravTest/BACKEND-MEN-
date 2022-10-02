const mongoose = require('mongoose')

const WishlistSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Product'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Wishlist', WishlistSchema)