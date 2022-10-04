const asyncHandler = require('express-async-handler')

const Cart = require('../models/cartModel')

//@desc      Get all cart details
//@route     GET   api/v1/cart/getall
//@access    private

const getSpecificCustomerCartList = asyncHandler(async (req, res) => {
    const cart = await Cart.find({ customer_id: req.params.id })
    res.status(200).json(cart);
})


//@desc     delete all products from customer cart
//@route     DELETE   api/v1/cart/get/:id
//@access    private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.deleteMany({ customer_id: req.params.id })
    res.status(200).json({ 'msg': 'cart clear', cart });
})



//@desc      Add into cart
//@route     POST   api/v1/cart/add
//@access    Private
const addIntoCart = asyncHandler(async (req, res) => {
    const { product_id, quantity, customer_id } = req.body

    if (!product_id || !quantity) {
        res.status(400)
        throw new Error('Enter all required fields')
    }


    const Checkcart = await Cart.findById(product_id)
    let cart = '';
    if (!Checkcart) {
        cart = await Cart.create({
            customer_id: customer_id, product_id, quantity
        })
    } else {
        cart = await Cart.findByIdAndUpdate(product_id, req.body.quantity, {
            new: true
        })
    }


    res.status(200).json(cart);
})


//@desc      update cart
//@route     PUT   api/v1/cart/update/:id
//@access    Private
const updateCart = asyncHandler(async (req, res) => {

    const { quantity } = req.body

    if (!quantity) {
        res.status(400)
        throw new Error('Enter all required fields')
    }

    const cart = await Cart.findById(req.params.id)
    if (!cart) {
        res.status(400)
        throw new Error('Product cart Not found')
    }

    const updatecart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'cart update :' + updatecart });
})


//@desc      delete cart
//@route     DELETE   api/v1/cart/delete/:id
//@access    Private
const deleteCart = asyncHandler(async (req, res) => {


    const cart = await Cart.findById(req.params.id)
    if (!cart) {
        res.status(400)
        throw new Error('cart product Not found')
    }

    await cart.remove()

    res.status(200).json({ message: 'delete cart product :' + req.params.id });
})





module.exports = {
    getSpecificCustomerCartList, addIntoCart, updateCart, deleteCart, clearCart
}


// {
//     "customer_id":"633b365cd7962899c64a8274",
//     "product_id":"633b2be6db9c8c675d0ee84c",
//     "quantity":"1"
//   }