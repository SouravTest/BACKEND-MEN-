const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    prooduct_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Product'
    }
    ,
    qty: {
        type: number,
        requird: [true, 'Enter Customer name']
    },
    price: {
        type: number,
        requird: [true, 'Enter Customer name']
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
        type: number,
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
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)