const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')

//@desc      Get all category
//@route     GET   api/v1/category/getall
//@access    Public
const getAllCategory = asyncHandler(async (req, res) => {
    const catagory = await Category.find()
    res.status(200).json(catagory);
})


//@desc      Get Spicific category
//@route     GET   api/v1/category/get/:id
//@access    Public
const getSpecificCategory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get specific category :' + req.params.id });
})



//@desc      Add category
//@route     GET   api/v1/category/add
//@access    Private
const addCategory = asyncHandler(async (req, res) => {
    if (!req.body.category_name) {
        res.status(400)
        throw new Error('Enter category name')
    }

    const catagory = await Category.create({
        category_name: req.body.category_name
    })

    res.status(200).json(catagory);
})


//@desc      update category
//@route     PUT   api/v1/category/update/:id
//@access    Private
const updateCategory = asyncHandler(async (req, res) => {

    if (!req.body.category_name) {
        res.status(400)
        throw new Error('Enter updated category name')
    }


    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category Not found')
    }

    const updatecategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'catagory update :' + updatecategory });
})


//@desc      delete category
//@route     DELETE   api/v1/category/delete/:id
//@access    Private
const deleteCategory = asyncHandler(async (req, res) => {


    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(400)
        throw new Error('Category Not found')
    }

    await category.remove()

    res.status(200).json({ message: 'delete cat :' + req.params.id });
})





module.exports = {
    getAllCategory, getSpecificCategory, addCategory, updateCategory, deleteCategory
}