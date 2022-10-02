const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Category'
    }, sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        requird: true,
        ref: 'Subcategory'
    }, brand: {
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
        type: number,
        requird: [true, 'Enter product mrp']

    }, sell_price: {
        type: number,
        requird: [true, 'Enter product sell price']

    }, discount: {
        type: number,
        requird: [true, 'Enter product discount']

    }, stock: {
        type: number,
        requird: [true, 'Enter product stock']

    },
    avalable_size: {
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