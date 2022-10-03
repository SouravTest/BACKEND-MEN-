const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Category'
    }, subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Subcategory'
    }, brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Brand'
    },
    product_name: {
        type: String,
        requird: [true, 'Enter product name']
    },
    description: {
        type: String,
        requird: [true, 'Enter product desc']
    },
    mrp: {
         type: Number,
        requird: [true, 'Enter product mrp']

    }, sell_price: {
         type: Number,
        requird: [true, 'Enter product sell price']

    }, discount: {
         type: Number,
        requird: [true, 'Enter product discount']

    }, stock: {
         type: Number,
        requird: [true, 'Enter product stock']

    },
    available_size: {
        type: String,
        requird: [true, 'Enter product sizes'],
    },
    available_color: {
        type: String,
        requird: [true, 'Enter product colors'],
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)