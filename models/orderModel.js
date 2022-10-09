const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
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
    ordered_price: {
        type: Number,
        requird: [true, 'Enter Ordered product price at time of order']
    },
    orderd_quantity: {
        type: Number,
        requird: [true, 'Enter Ordered product quantity']
    },
    ordered_size: {
        type: String,
        requird: [true, 'Enter Ordered product size']
    },
    ordered_color: {
        type: String,
        requird: [true, 'Enter Ordered product color']
    },
    name: {
        type: String,
        requird: [true, 'Enter Customer name']
    },
    mobile: {
        type: String,
        requird: [true, 'Enter Customer mobile']
    },
    pin: {
        type: Number,
        requird: [true, 'Enter Customer pin']
    },
    locality: {
        type: String,
        requird: [true, 'Enter Customer locality']
    },
    address: {
        type: String,
        requird: [true, 'Enter Customer address']
    },
    city: {
        type: String,
        requird: [true, 'Enter Customer city']
    },
    state: {
        type: String,
        requird: [true, 'Enter Customer state']
    },
    landmark: {
        type: String,
        requird: [true, 'Enter Customer landmark']
    },
    alt_mobile: {
        type: String,
        requird: [true, 'Enter Customer alt_mobile']
    },
    address_type: {
        type: String,
        requird: [true, 'Enter Customer address_type']
    },
    shared_details_with: {
        type: [String],
        default: []
    },
    order_status: {
        type: String,
        default: 'Orderd'
    },
    isCancled: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)