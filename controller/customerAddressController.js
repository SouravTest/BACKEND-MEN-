const asyncHandler = require('express-async-handler')

const CustomerAddress = require('../models/customerAddressModel')
const Customer = require('../models/customerModel')

//@desc      Get all saved addresses of customer
//@route     GET   api/v1/customer/savedaddresses
//@access    Private
const getAllCustomerAddresses = asyncHandler(async (req, res) => {
    const addresses = await CustomerAddress.find({customer_id:req.user._id})
    if (!addresses) {
        res.status(400)
        throw new Error('No address saved')
    }

    res.status(200).json(addresses);
})


//@desc      Get Spicific addaddress details of a customer
//@route     GET   api/v1/customer/getaddress/:id
//@access    Private
const getCustomerAddress = asyncHandler(async (req, res) => {
    const address = await CustomerAddress.findOne({customer_id:req.user._id,_id:req.params.id})
    if (!address) {
        res.status(400)
        throw new Error('address Not found')
    }
    res.status(200).json(address);
})



//@desc      Add addaddress
//@route     POST   api/v1/customer/addaddress
//@access    Private
const addCustomerAddress = asyncHandler(async (req, res) => {

    const { name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type } = req.body

    if (!name || !mobile || !pin || !locality || !address || !city || !state || !landmark || !alt_mobile || !address_type) {
        res.status(400)
        throw new Error('Enter all required filed')
    }
    //check customer
    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('Customer Not found')
    }

    const addaddress = await CustomerAddress.create({
        customer_id: req.user._id,
        name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type
    })

    if (!addaddress) {
        res.status(400)
        throw new Error('Invalid Address')
    }
    res.status(200).json(addaddress);
})


//@desc      update saved address of a customer
//@route     PUT   api/v1/customer/updateaddress/:id
//@access    Private
const updateCustomerAddress = asyncHandler(async (req, res) => {

    const { name, mobile, pin, locality, address, city, state, landmark, alt_mobile, address_type } = req.body

    if (!name || !mobile || !pin || !locality || !address || !city || !state || !landmark || !alt_mobile || !address_type) {
        res.status(400)
        throw new Error('Enter all required filed')
    }


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const updateaddress = await CustomerAddress.findOneAndUpdate({ customer_id: req.user._id, _id: req.params.id }, req.body, {
        new: true
    })

    if (!updateaddress) {
        res.status(400)
        throw new Error('Invalid Address')
    }

    res.status(200).json({ message: 'address update :' + updateaddress });
})


//@desc      delete a specific address of a customer
//@route     DELETE   api/v1/customer/removeaddress/:id
//@access    Private
const deleteCustomerAddress = asyncHandler(async (req, res) => {


    const customer = await Customer.findById(req.user._id)
    if (!customer) {
        res.status(400)
        throw new Error('customer Not found')
    }

    const deleteaddress = await CustomerAddress.findOneAndDelete({ customer_id: req.user._id, _id: req.params.id })
    if (!deleteaddress) {
        res.status(400)
        throw new Error('Invalid Address')
    }

    res.status(200).json({ message: 'address deleted :' + deleteaddress });
})





module.exports = {
    getAllCustomerAddresses, getCustomerAddress, addCustomerAddress, updateCustomerAddress, deleteCustomerAddress
}




// {
//     "name":"BUBU",
//     "mobile":"99999999",
//     "pin":"78965",
//     "locality":"purulia",
//     "address":"purulia bazr",
//     "city":"purulia",
//     "state":"west bengal",
//     "landmark":"near bus stand",
//     "alt_mobile":"7896541230",
//     "address_type":"home"
// }