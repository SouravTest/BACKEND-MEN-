const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Customer'
    },
    orderd_products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                requird: true,
                ref: 'Product'
            },
            product_name: {
                type: String,
                required: true,
                requird: [true, 'Enter Ordered product name']
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
            cancel_this_product: {
                type: Boolean,
                default: false
            },
            staus_this_product: {
                type: String,
                default: null
            }
        }
    ],
    shippingInfo: {
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
    },



    payment_info: {
        id: {
            type: String,
            requird: [true, 'Enter Paymet id']
        },
        status: {
            type: String,
            requird: [true, 'Enter Paymet status']
        },
    },
    shared_details_with: {
        type: [String],
        default: []
    },
    paidAt: {
        type: Date,
        required: true,
        default:Date.now()
    },
    items_price: {
        type: Number,
        required: true,
    },
    tax_price: {
        type: Number,
        required: true,
        default: 0,
    },
    shipping_price: {
        type: Number,
        required: true,
        default: 0,
    },
    total_price: {
        type: Number,
        required: true,
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