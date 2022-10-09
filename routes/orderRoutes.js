const express = require('express')
const router = express.Router()

const { getAllOrders, getOrder, addOrder, updateOrderDetails,updateOrderAddress, cancelOrder } = require('../controller/orderController')

const { CustomerProtect } = require('../middleware/authCustomerMiddleware')


router.get('/allorders', CustomerProtect, getAllOrders);

router.get('/getorder/:id', CustomerProtect, getOrder)

router.post('/addorder', CustomerProtect, addOrder)

router.put('/updateorderdetails/:id', CustomerProtect, updateOrderDetails)  //For update : quantuty , color , size 

router.put('/updateorderaddress/:id', CustomerProtect, updateOrderAddress)  //For update : address

router.delete('/cancelorder/:id', CustomerProtect, cancelOrder)    //one type update ... changing status

module.exports = router