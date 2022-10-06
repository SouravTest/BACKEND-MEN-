const express = require('express')
const router = express.Router()

const { getSpecificCustomerWishlistList, addIntoWishlist, deleteWishlist, clearWishlist } = require('../controller/wishlistController')

const { CustomerProtect } = require('../middleware/authCustomerMiddleware')

router.get('/mywishlist', CustomerProtect, getSpecificCustomerWishlistList)

router.post('/add', CustomerProtect, addIntoWishlist);

router.delete('/delete/:id', CustomerProtect, deleteWishlist)

router.delete('/deleteall', CustomerProtect, clearWishlist)


module.exports = router