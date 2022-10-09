const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const Product = require('../models/productModel')

//@desc      Get all orders of customer
//@route     GET   api/v1/customer/allorders
//@access    Private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customer_id: req.user._id })
    if (!orders) {
        res.status(400)
        throw new Error('No address saved')
    }

    res.status(200).json(orders);
})


//@desc      Get Spicific order details of a customer
//@route     GET   api/v1/customer/getorder/:id
//@access    Private
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findOne({ customer_id: req.user._id, _id: req.params.id })
    if (!order) {
        res.status(400)
        throw new Error('Order Not found')
    }
    res.status(200).json(order);
})



//@desc      Add order
//@route     POST   api/v1/customer/addorder
//@access    Private
const addOrder = asyncHandler(async (req, res) => {

    const { product_id, orderd_quantity, ordered_price, ordered_size, ordered_color, name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type } = req.body

    if (!product_id || !orderd_quantity || !ordered_price || !ordered_size || !ordered_color || !name || !mobile || !pin || !locality || !address || !city || !state || !landmark || !alt_mobile || !address_type) {
        res.status(400)
        throw new Error('Enter all required filed')
    }
    //check customer
    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('Customer Not found')
    }

    //check customer
    const product = await Product.findById(product_id)
    if (!product) {
        res.status(400)
        throw new Error('product Not found')
    }

    const order = await Order.create({
        customer_id: req.user._id, product_id, ordered_price, orderd_quantity, ordered_size, ordered_color, name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type
    })

    if (!order) {
        res.status(400)
        throw new Error('Invalid order')
    }
    res.status(200).json(order);
})


//@desc      update order details of a customer
//@route     PUT   api/v1/customer/updateorderdetails/:id
//@access    Private
const updateOrderDetails = asyncHandler(async (req, res) => {

    const { orderd_quantity, ordered_size, ordered_color } = req.body

    if (!orderd_quantity || !ordered_size || !ordered_color) {
        res.status(400)
        throw new Error('Enter all required filed')
    }


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const updateorder = await Order.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.id }, {
        orderd_quantity, ordered_size, ordered_color
    }, {
        new: true
    })

    if (!updateorder) {
        res.status(400)
        throw new Error('Invalid order')
    }

    res.status(200).json({ message: 'order details update :' + updateorder });
})



//@desc      update order address of a customer
//@route     PUT   api/v1/customer/updateorderaddress/:id
//@access    Private
const updateOrderAddress = asyncHandler(async (req, res) => {

    const { name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type } = req.body

    if (!name || !mobile || !pin || !locality || !address || !city || !state || !landmark || !alt_mobile || !address_type) {
        res.status(400)
        throw new Error('Enter all required filed')
    }


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const updateorder = await Order.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.id }, {
        name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type
    }, {
        new: true
    })

    if (!updateorder) {
        res.status(400)
        throw new Error('Invalid order')
    }

    res.status(200).json({ message: 'order address update :' + updateorder });
})



//@desc      cancel a specific order of a customer
//@route     PUT   api/v1/customer/cancelorder/:id
//@access    Private
const cancelOrder = asyncHandler(async (req, res) => {


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const cancelorder = await Order.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.id, isCancled: false }, {
        isCancled: true
    }, {
        new: true
    })

    if (!cancelorder) {
        res.status(400)
        throw new Error('Invalid order')
    }

    res.status(200).json({ message: 'order cancled :' + cancelorder });
})





module.exports = {
    getAllOrders, getOrder, addOrder, updateOrderDetails, updateOrderAddress, cancelOrder
}




// {
// 	"product_id":"633b2c20db9c8c675d0ee853",
// 	"orderd_quantity":"4",
// 	"ordered_price":5555,
// 	"ordered_size":"XL",
// 	"ordered_color":"dark",
//     "name":"BUB4444",
//     "mobile":"99999999",
//     "pin":"78965",
//     "locality":"purulia",
//     "address":"purulia bazr",
//     "city":"purulia",
//     "state":"west bengal",
//     "landmark":"near bus stand",
//     "alt_mobile":"7896541230",
//     "address_type":"home"
// }