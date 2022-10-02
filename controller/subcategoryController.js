const asyncHandler = require('express-async-handler')

const  Subcategory = require('../models/subcategoryModel')
const Category = require('../models/categoryModel')

//@desc      Get all subcategory
//@route     GET   api/v1/subcategory/getall
//@access    Public
const getAllSubcategory = asyncHandler(async (req, res) => {
    const subategory = await Subcategory.find()
    res.status(200).json(subategory);
})


//@desc      Get Spicific subcategory
//@route     GET   api/v1/subcategory/get/:id
//@access    Public
const getSpecificSubcategory = asyncHandler(async (req, res) => {
    const subategory = await Subcategory.findById(req.params.id)
    if(!subategory){
        res.status(400)
        throw new Error('Subategory Not found')
    }
    res.status(200).json(subategory);
})



//@desc      Add subcategory
//@route     GET   api/v1/subcategory/add
//@access    Private
const addSubcategory = asyncHandler(async (req, res) => {
    if (!req.body.subcategory_name ) {
        res.status(400)
        throw new Error('Enter subcategory name ')
    }
    if (!req.body.category_id) {
        res.status(400)
        throw new Error('Enter category id')
    }

    const category = await Category.findById(req.body.category_id)
    if(!category){
        res.status(400)
        throw new Error('Category Not found')
    }

    const subcatagory = await Subcategory.create({
        category : req.body.category_id,
        subcategory_name : req.body.subcategory_name
    })

    res.status(200).json(subcatagory);
})


//@desc      update subcategory
//@route     GET   api/v1/subcategory/update/:id
//@access    Private
const updateSubategory = asyncHandler(async (req, res) => {

    if (!req.body.subcategory_name) {
        res.status(400)
        throw new Error('Enter updated subcategory name')
    }


    const subcategory = await Subcategory.findById(req.params.id)
    if(!subcategory){
        res.status(400)
        throw new Error('Subategory Not found')
    }

    const updatesubcategory = await Subcategory.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({ message: 'subcatagory update :' + updatesubcategory });
})


//@desc      delete subcategory
//@route     GET   api/v1/subcategory/delete/:id
//@access    Private
const deleteSubcategory = asyncHandler(async (req, res) => {

    
    const subcategory = await Subcategory.findById(req.params.id)
    if(!subcategory){
        res.status(400)
        throw new Error('Subategory Not found')
    }

    await subcategory.remove()

    res.status(200).json({ message: 'delete success subcategory :' + req.params.id });
})





module.exports = {
    getAllSubcategory,getSpecificSubcategory,addSubcategory,updateSubategory,deleteSubcategory
}