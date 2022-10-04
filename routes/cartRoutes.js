const express = require('express')
const router = express.Router()

const { getSpecificCustomerCartList, addIntoCart, updateCart, deleteCart, clearCart } = require('../controller/cartController')

router.get('/get/:id', getSpecificCustomerCartList)

router.post('/add', addIntoCart);

router.put('/update/:id', updateCart);

router.delete('/delete/:id', deleteCart)

router.delete('/deleteall/:id', clearCart)


module.exports = router