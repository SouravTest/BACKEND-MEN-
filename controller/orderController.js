const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const Product = require('../models/productModel')

const NewOrder = require('../models/orderModel')

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





//@desc      Add order in model 2
//@route     POST   api/v1/customer/addorder
//@access    Private
const addOrder = asyncHandler(async (req, res) => {

    const {
        shippingInfo, orderd_products, paymentInfo, items_price, tax_price, shipping_price, total_price, payment_info } = req.body;


    if (!shippingInfo.name || !shippingInfo.mobile || !shippingInfo.pin || !shippingInfo.locality || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.landmark || !shippingInfo.alt_mobile || !shippingInfo.address_type) {
        res.status(400)
        throw new Error('Enter all required filed for shipping')
    }


    if (!orderd_products || !shippingInfo || !payment_info) {
        res.status(400)
        throw new Error('Enter all required filed')
    }
    //check customer
    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('Customer Not found')
    }

    const order = await NewOrder.create({
        customer_id: req.user._id, shippingInfo, orderd_products, paymentInfo, items_price, tax_price, shipping_price, total_price, payment_info,
        paidAt: Date.now()
    })

    if (!order) {
        res.status(400)
        throw new Error('Invalid order')
    }
    res.status(200).json(order);
})









//@desc      update order details of a customer
//@route     PUT   api/v1/customer/updateorderdetails/:orderid/:orderitemid
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

    const updateorder = await NewOrder.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.orderid, 'orderd_products._id': req.params.orderitemid }, {
        '$set': {
            'orderd_products.$.orderd_quantity': orderd_quantity,
            'orderd_products.$.ordered_size': ordered_size,
            'orderd_products.$.ordered_color': ordered_color
        }
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
//@route     PUT   api/v1/customer/updateorderaddress/:orderid/:orderitemid
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

    const updateorder = await Order.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.orderid, 'orderd_products._id': req.params.orderitemid }, {
        'shippingInfo.name': name,
        'shippingInfo.mobile': mobile,
        'shippingInfo.pin': pin,
        'shippingInfo.locality': locality,
        'shippingInfo.address': address,
        'shippingInfo.city': city,
        'shippingInfo.state': state,
        'shippingInfo.landmark': landmark,
        'shippingInfo.alt_mobile': alt_mobile,
        'shippingInfo.address_type': address_type
    }, {
        new: true
    })

    if (!updateorder) {
        res.status(400)
        throw new Error('Invalid order')
    }

    res.status(200).json({ message: 'order address update :' + updateorder });
})



//@desc      cancel a specific whole order of a customer
//@route     PUT   api/v1/customer/cancelwholeorder/:id
//@access    Private
const cancelOrderwhole = asyncHandler(async (req, res) => {


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const cancelorder = await Order.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.orderid, 'orderd_products._id': req.params.orderitemid, isCancled: false }, {
        '$set': {
            'orderd_products.$.cancel_this_product': true,
        }
    }, {
        new: true
    })

    if (!cancelorder) {
        res.status(400)
        throw new Error('Invalid order')
    }

    res.status(200).json({ message: 'order single product cancled :' + cancelorder });
})











//@desc      cancel a specific whole order of a customer
//@route     PUT   api/v1/customer/cancelwholeorder/:id
//@access    Private
const cancelOrdersingleproduct = asyncHandler(async (req, res) => {


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
    getAllOrders, getOrder, addOrder, updateOrderDetails, updateOrderAddress, cancelOrderwhole, cancelOrdersingleproduct
}







//-------for model 2---------------------------------------------------------


// {
// 	"orderd_products":[
//         {
// 		"product_id":"633b2c20db9c8c675d0ee853",
// 	    "product_name":"lap",
// 		"orderd_quantity":"4",
// 		"ordered_price":5555,
// 		"ordered_size":"XL",
// 		"ordered_color":"dark"
//         },
//         {
//         "product_id":"633b2be6db9c8c675d0ee84c",
//         "product_name":"hp 6g",
//         "orderd_quantity":"4",
//         "ordered_price":5555,
//         "ordered_size":"XL",
//         "ordered_color":"dark"
//         }
//     ],
//    "shippingInfo": {
//         "name":"BUB4444",
//         "mobile":"99999999",
//         "pin":"78965",
//         "locality":"purulia",
//         "address":"purulia bazr",
//         "city":"purulia",
//         "state":"west bengal",
//         "landmark":"near bus stand",
//         "alt_mobile":"7896541230",
//         "address_type":"home"
//    },
//    "payment_info":{
//         "id":"OKIDsample",
//         "status":"success"
//    },
//    "items_price":5555 ,
//    "shipping_price":11,
//    "total_price":5566
// }