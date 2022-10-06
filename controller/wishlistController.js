const asyncHandler = require('express-async-handler')

const Wishlist = require('../models/wishlistModel')

//@desc      Get all wishlist details
//@route     GET   api/v1/wishlist/mywishlist
//@access    private

const getSpecificCustomerWishlistList = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.find({ customer_id: req.user._id })
    res.status(200).json(wishlist);
})


//@desc     delete all wishlist from customer wishlist
//@route     DELETE   api/v1/wishlist/deleteall
//@access    private
const clearWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.deleteMany({ customer_id: req.user._id })
    res.status(200).json({ 'msg': 'wishlist clear', wishlist });
})



//@desc      Add into wishlist
//@route     POST   api/v1/wishlist/add
//@access    Private
const addIntoWishlist = asyncHandler(async (req, res) => {
    const { product_id } = req.body

    if (!product_id) {
        res.status(400)
        throw new Error('Enter product id')
    }


    const Checkwishlist = await Wishlist.count({ product_id: product_id, customer_id: req.user._id })
    let wishlist = '';
    if (Checkwishlist === 0) {
        wishlist = await Wishlist.create({
            customer_id: req.user._id, product_id
        })
    } else {
        wishlist = 'alredy available in wishlist'
    }

    res.status(200).json(wishlist);
})




//@desc      delete wishlist
//@route     DELETE   api/v1/wishlist/delete/:id
//@access    Private
const deleteWishlist = asyncHandler(async (req, res) => {


    const wishlist = await Wishlist.findById(req.params.id)
    if (!wishlist) {
        res.status(400)
        throw new Error('wishlist product Not found')
    }

    await Wishlist.findOneAndDelete(req.params.id)

    res.status(200).json({ message: 'delete wishlist product :' + req.params.id });
})





module.exports = {
    getSpecificCustomerWishlistList, addIntoWishlist, deleteWishlist, clearWishlist
}


// {
//     "customer_id":"633b365cd7962899c64a8274",
//     "product_id":"633b2be6db9c8c675d0ee84c",
//   }