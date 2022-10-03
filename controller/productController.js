const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')

//@desc      Get all product
//@route     GET   api/v1/product/getall
//@access    Public
const getAllProduct = asyncHandler(async (req, res) => {
    const product = await Product.find().populate([
        {
            path: "category_id",
            select: "category_name",
        },
        {
            path: "subcategory_id",
            select: "subcategory_name",
        },
        {
            path: "brand_id",
            select: "brand_name",
        }
    ])

    // .populate('category_id subcategory_id brand_id')

    // .populate({
    //     path: 'category_id',
    //     select:'category_name',
    //   });
    res.status(200).json(product);
})


//@desc      Get Spicific product
//@route     GET   api/v1/product/get/:id
//@access    Public
const getSpecificProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('product Not found')
    }
    res.status(200).json(product);
})



//@desc      Add product
//@route     GET   api/v1/product/add
//@access    Private
const addProduct = asyncHandler(async (req, res) => {
    const { category_id, subcategory_id, brand_id, product_name, description, mrp, sell_price, stock, available_size, available_color } = req.body

    if (!category_id || !subcategory_id || !brand_id || !product_name || !description || !mrp || !sell_price || !stock || !available_size || !available_color) {
        res.status(400)
        throw new Error('Enter all required fields')
    }
    const product = await Product.create({
        category_id, subcategory_id, brand_id, product_name, description, mrp, sell_price,
        discount: ((mrp - sell_price) / mrp) * 100,
        stock, available_size, available_color
    })

    res.status(200).json(product);
})


//@desc      update product
//@route     GET   api/v1/product/update/:id
//@access    Private
const updateProduct = asyncHandler(async (req, res) => {

    // const { category_id, subcategory_id, brand_id, product_name, description, mrp, sell_price, stock, available_size, available_color } = req.body

    // if (!category_id || !subcategory_id || !brand_id || !product_name || !description || !mrp || !sell_price || !stock || !available_size || !available_color) {
    //     res.status(400)
    //     throw new Error('Enter all required fields')
    // }

    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('product Not found')
    }

    const updateproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'product update :' + updateproduct });
})


//@desc      delete product
//@route     GET   api/v1/product/delete/:id
//@access    Private
const deleteProduct = asyncHandler(async (req, res) => {


    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('product Not found')
    }

    await product.remove()

    res.status(200).json({ message: 'delete product :' + req.params.id });
})





module.exports = {
    getAllProduct, getSpecificProduct, addProduct, updateProduct, deleteProduct
}






// {
//     "category_id":"6339389a0ed694d558290b93",
//     "subcategory_id":"63395440677f4bd6d3b48d4b",
//     "brand_id":"633b1f5d64932b3ec39942e5",
//     "product_name":"hp new 5g",
//     "description":"5g mob +",
//     "mrp":"99999",
//     "sell_price":"88888",
//     "stock":"5",
//     "available_size":"null",
//     "available_color":"black,white,blue"
//   }