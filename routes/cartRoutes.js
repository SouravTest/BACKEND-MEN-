const express = require('express')
const router = express.Router()

const { getSpecificCustomerCartList, addIntoCart, updateCart, deleteCart, clearCart } = require('../controller/cartController')

const {CustomerProtect} = require('../middleware/authCustomerMiddleware')

router.get('/get/:id',CustomerProtect, getSpecificCustomerCartList)

router.post('/add',CustomerProtect, addIntoCart);

router.put('/update/:id',CustomerProtect, updateCart);

router.delete('/delete/:id',CustomerProtect, deleteCart)

router.delete('/deleteall/:id',CustomerProtect, clearCart)


module.exports = router