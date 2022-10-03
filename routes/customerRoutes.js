const express = require('express')
const router = express.Router()

const { getCustomerDetails, addCustomer, loginCustomer, updateCustomer, getAllCustomer, deleteCustomer } = require('../controller/customerController.js')

router.post('/register', addCustomer)

router.post('/login', loginCustomer);

router.get('/get/:id', getCustomerDetails)

router.put('/update/:id', updateCustomer);


router.get('/getall', getAllCustomer);

router.delete('/delete/:id', deleteCustomer);

module.exports = router