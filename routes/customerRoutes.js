const express = require('express')
const router = express.Router()

const { getCustomerDetails, addCustomer, loginCustomer, updateCustomer, getAllCustomer, deleteCustomer } = require('../controller/customerController')
const { getAllCustomerAddresses, getCustomerAddress, addCustomerAddress, updateCustomerAddress, deleteCustomerAddress } = require('../controller/customerAddressController')

const { CustomerProtect } = require('../middleware/authCustomerMiddleware')
const { SuperAdminProtect } = require('../middleware/authSuperAdminMiddleware')

router.post('/register', addCustomer)

router.post('/login', loginCustomer);

router.get('/me', CustomerProtect, getCustomerDetails)

router.put('/update/:id', CustomerProtect, updateCustomer);

router.get('/getall', SuperAdminProtect, getAllCustomer);

router.delete('/delete/:id', SuperAdminProtect, deleteCustomer);

//adrress related routes
router.get('/savedaddresses', CustomerProtect, getAllCustomerAddresses);
router.get('/getaddress/:id', CustomerProtect, getCustomerAddress)
router.post('/addaddress', CustomerProtect, addCustomerAddress)
router.put('/updateaddress/:id', CustomerProtect, updateCustomerAddress)
router.delete('/removeaddress/:id', CustomerProtect, deleteCustomerAddress)

module.exports = router