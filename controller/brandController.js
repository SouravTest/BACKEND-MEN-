const asyncHandler = require('express-async-handler')

const Brand = require('../models/brandModel')

//@desc      Get all brand
//@route     GET   api/v1/brand/getall
//@access    Public
const getAllBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.find()
    res.status(200).json(brand);
})


//@desc      Get Spicific brand
//@route     GET   api/v1/brand/get/:id
//@access    Public
const getSpecificBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        res.status(400)
        throw new Error('brand Not found')
    }
    res.status(200).json(brand);
})



//@desc      Add brand
//@route     GET   api/v1/brand/add
//@access    Private
const addBrand = asyncHandler(async (req, res) => {
    if (!req.body.brand_name) {
        res.status(400)
        throw new Error('Enter brand name')
    }

    const brand = await Brand.create({
        brand_name: req.body.brand_name
    })

    res.status(200).json(brand);
})


//@desc      update brand
//@route     GET   api/v1/brand/update/:id
//@access    Private
const updateBrand = asyncHandler(async (req, res) => {

    if (!req.body.brand_name) {
        res.status(400)
        throw new Error('Enter updated brand name')
    }


    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        res.status(400)
        throw new Error('brand Not found')
    }

    const updatebrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'brand update :' + updatebrand });
})


//@desc      delete brand
//@route     GET   api/v1/brand/delete/:id
//@access    Private
const deleteBrand = asyncHandler(async (req, res) => {


    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        res.status(400)
        throw new Error('brand Not found')
    }

    await brand.remove()

    res.status(200).json({ message: 'delete brand :' + req.params.id });
})





module.exports = {
    getAllBrand, getSpecificBrand, addBrand, updateBrand, deleteBrand
}