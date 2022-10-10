const express = require('express')
const router = express.Router()

const { getAllOrders, getOrder, addOrder, updateOrderDetails,updateOrderAddress, cancelOrderwhole ,cancelOrdersingleproduct} = require('../controller/orderController')

const { CustomerProtect } = require('../middleware/authCustomerMiddleware')


router.get('/allorders', CustomerProtect, getAllOrders);

router.get('/getorder/:id', CustomerProtect, getOrder)

router.post('/addorder', CustomerProtect, addOrder)   

router.put('/updateorderdetails/:orderid/:orderitemid', CustomerProtect, updateOrderDetails) //For update : quantuty , color , size 

router.put('/updateorderaddress/:orderid/:orderitemid', CustomerProtect, updateOrderAddress)  //For update : address

router.delete('/cancelorderitem/:orderid/:orderitemid', CustomerProtect, cancelOrderwhole)    //For cancel :single product from oderd products    ||one type update ... changing status 

router.delete('/cancelwholeorder/:id', CustomerProtect, cancelOrdersingleproduct)    //For cancel :whole oderd ||  one type update ... changing status

module.exports = router