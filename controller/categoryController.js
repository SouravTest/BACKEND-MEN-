const asyncHandler = require('express-async-handler')

//@desc      Get all category
//@route     GET   api/v1/category/getall
//@access    Public
const getAllCategory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get all category' });
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
    if (!req.body.catname) {
        res.status(400)
        throw new Error('Enter category name')
    }

    res.status(200).json({ message: 'create catagory' });
})


//@desc      update category
//@route     GET   api/v1/category/update/:id
//@access    Private
const updateCategory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'catagory update :' + req.params.id });
})


//@desc      delete category
//@route     GET   api/v1/category/delete/:id
//@access    Private
const deleteCategory = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'delete cat :' + req.params.id });
})





module.exports = {
    getAllCategory, getSpecificCategory, addCategory, updateCategory, deleteCategory
}