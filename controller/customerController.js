const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')




//@desc      Get customer details
//@route     GET   api/v1/customer/get/:id
//@access    PRIVATE
const getCustomerDetails = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id, ['_id', 'name', 'email'])
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }
    res.status(200).json(customer);
})



//@desc      Add customer(Register)
//@route     POST   api/v1/customer/register
//@access    public

const addCustomer = asyncHandler(async (req, res) => {

    const { customer_name, email, password, mobile, gender, pincode, city, } = req.body

    if (!gender || !city || !pincode) {
        res.status(400)
        throw new Error('Enter all fields')
    }

    if (!req.body.customer_name) {
        res.status(400)
        throw new Error('Enter name')
    }
    if (!req.body.email) {
        res.status(400)
        throw new Error('Enter email')
    }
    if (!req.body.mobile) {
        res.status(400)
        throw new Error('Enter mobile')
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error('Enter password')
    }


    //checking if available email

    const superAdminExists = await Customer.findOne({ email })
    if (superAdminExists) {
        res.status(400)
        throw new Error('Email alredy exists')
    }


    //Hash password

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const customer = await Customer.create({
        customer_name,
        email,
        password: hashedPassword,
        mobile, city, gender, pincode
    })

    if (customer) {
        res.status(201).json({
            _id: customer.id,
            name: customer.name,
            email: customer.email,
            token: generateToken(customer.id)
        })
    } else {
        res.status(400)
        throw new Error('Unable to register')
    }
})



//@desc      Login customer 
//@route     POST   api/v1/customer/login
//@access    Public
const loginCustomer = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Enter email & password')
    }

    //checking email
    const customer = await Customer.findOne({ email })
    if (customer) {
        if (await bcrypt.compare(password, customer.password)) {
            res.status(201).json({
                _id: customer.id,
                name: customer.name,
                email: customer.email,
                token: generateToken(customer.id)
            })
        } else {
            res.status(400)
            throw new Error('Wrong Email or password')
        }
    } else {
        res.status(400)
        throw new Error('Wrong Email or password ..')
    }


})



//@desc      update customer
//@route     PUT   api/v1/customer/update/:id
//@access    Private
const updateCustomer = asyncHandler(async (req, res) => {

    const { customer_name, email, mobile, gender, pincode, city } = req.body

    if (!customer_name || !email || !mobile || !gender || !city || !pincode) {
        res.status(400)
        throw new Error('Enter all fields')
    }

    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const updatecustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'customer update :' + updatecustomer });
})





//@desc      Get all Customer
//@route     GET   api/v1/customer/getall
//@access    PRIVATE
const getAllCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.find()
    res.status(200).json(customer);
})



//@desc      delete customer
//@route     DELETE   api/v1/customer/delete/:id
//@access    Private
const deleteCustomer = asyncHandler(async (req, res) => {


    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    await customer.remove()

    res.status(200).json({ message: 'delete customer :' + req.params.id });
})






// ------GENERAT TOKEN (JWT) ---------//
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    getCustomerDetails, addCustomer, loginCustomer, updateCustomer, getAllCustomer, deleteCustomer
}





// {
//     "name":"sourav",
//     "email":"customer@gmail.com",
//   "password":"123",
//   "mobile":"9874563210",
//   "gender":"M",
//   "pincode":"7000001",
//   "city":"kolkata"
//   }