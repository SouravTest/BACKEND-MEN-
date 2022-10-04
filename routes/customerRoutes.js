const express = require('express')
const router = express.Router()

const { getCustomerDetails, addCustomer, loginCustomer, updateCustomer, getAllCustomer, deleteCustomer } = require('../controller/customerController.js')

const {CustomerProtect} = require('../middleware/authCustomerMiddleware')
const {SuperAdminProtect} = require('../middleware/authSuperAdminMiddleware')

router.post('/register', addCustomer)

router.post('/login', loginCustomer);

router.get('/get/:id',CustomerProtect, getCustomerDetails)

router.put('/update/:id',CustomerProtect, updateCustomer);


router.get('/getall', SuperAdminProtect,getAllCustomer);

router.delete('/delete/:id',SuperAdminProtect, deleteCustomer);

module.exports = router